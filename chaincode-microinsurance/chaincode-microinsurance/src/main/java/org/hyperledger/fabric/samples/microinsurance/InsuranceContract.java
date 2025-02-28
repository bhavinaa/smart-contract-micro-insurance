/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.microinsurance;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contact;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Info;
import org.hyperledger.fabric.contract.annotation.License;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import com.owlike.genson.Genson;
import com.owlike.genson.GensonBuilder;

@Contract(
        name = "basic",
        info = @Info(
                title = "Micro Insurance",
                description = "The Micro Insurance solution for Farmers",
                version = "0.0.1-SNAPSHOT",
                license = @License(
                        name = "Apache 2.0 License",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"),
                contact = @Contact(
                        email = "a.transfer@example.com",
                        name = "Bhavina",
                        url = "https://hyperledger.example.com")))
@Default
public final class InsuranceContract implements ContractInterface {

    //private final Genson genson = new Genson();

   private final Genson genson = new GensonBuilder()
                                    .exclude("startDate", InsurancePolicy.class)
                                    .exclude("endDate", InsurancePolicy.class)
                                    .create();

    private enum InsurancePolicyTransferErrors {
        ASSET_NOT_FOUND,
        ASSET_ALREADY_EXISTS
    }

    /**
     * Creates some initial assets on the ledger.
     *
     * @param ctx the transaction context
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public void InitLedger(final Context ctx) {

       // LocalDate startDate = LocalDate.of(2024, 3, 16);
       // LocalDate endDate = LocalDate.of(2026, 3, 16);

        InsurancePolicy policyA = new InsurancePolicy(
            "policy1",
            "farmer123",
            "John Doe",
            "Plan A",
            "Good",
            1000,
            5000.0,
            200.0,
           
            "Active"
        );

        InsurancePolicy policyB = new InsurancePolicy(
            "policy2",
            "farmer456",
            "Jane Doe",
            "Plan B",
            "Fair",
            2000,
            10000.0,
            400.0,
           
            "Active"
        );

        InsurancePolicy policyC = new InsurancePolicy(
            "policy3",
            "farmer789",
            "Bob Smith",
            "Plan C",
            "Poor",
            3000,
            15000.0,
            600.0,
          
            "Active"
        );

        putInsurancePolicy(ctx, policyA);
        putInsurancePolicy(ctx, policyB);
        putInsurancePolicy(ctx, policyC);
    }

    /**
     * Creates a new asset on the ledger.
     *
     * @param ctx the transaction context
     * @param policyID the ID of the new asset
     * @param farmerID the farmerID of the new asset
     * @param farmerName the farmerName of the new asset
     * @param planName the planName of the new asset
     * @param condition the condition of the new asset
     * @param payoutAmount the payoutAmount of the new asset
     * @param coverageAmount the coverageAmount of the new asset
     * @param premiumAmount the premiumAmount of the new asset
     * @param startDate the startDate of the new asset
     * @param endDate the endDate of the new asset
     * @param status the status of the new asset
     * @return the created asset
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public InsurancePolicy CreateInsurancePolicy(final Context ctx, final String policyID, final String farmerID, final String farmerName, final String planName, final String condition, final int payoutAmount,
        final double coverageAmount, final double premiumAmount,  final String status) {

        if (InsurancePolicyExists(ctx, policyID)) {
            String errorMessage = String.format("InsurancePolicy %s already exists", policyID);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, InsurancePolicyTransferErrors.ASSET_ALREADY_EXISTS.toString());
        }

        return putInsurancePolicy(ctx, new InsurancePolicy(
            policyID,
            farmerID,
            farmerName,
            planName,
            condition,
            payoutAmount,
            coverageAmount,
            premiumAmount,
           // startDate,
           // endDate,
            status
        ));

    }

    private InsurancePolicy putInsurancePolicy(final Context ctx, final InsurancePolicy asset) {
        // Use Genson to convert the InsurancePolicy into string, sort it alphabetically and serialize it into a json string
        String sortedJson = genson.serialize(asset);
        ctx.getStub().putStringState(asset.getPolicyID(), sortedJson);

        return asset;
    }

    /**
     * Retrieves an asset with the specified ID from the ledger.
     *
     * @param ctx the transaction context
     * @param assetID the ID of the asset
     * @return the asset found on the ledger if there was one
     */
    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public InsurancePolicy ReadInsurancePolicy(final Context ctx, final String assetID) {
        String assetJSON = ctx.getStub().getStringState(assetID);

        if (assetJSON == null || assetJSON.isEmpty()) {
            String errorMessage = String.format("InsurancePolicy %s does not exist", assetID);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, InsurancePolicyTransferErrors.ASSET_NOT_FOUND.toString());
        }

        return genson.deserialize(assetJSON, InsurancePolicy.class);
    }

    /**
     * Updates the properties of an asset on the ledger.
     *
     * @param ctx the transaction context
     * @param assetID the ID of the asset being updated
     * @param color the color of the asset being updated
     * @param size the size of the asset being updated
     * @param owner the owner of the asset being updated
     * @param appraisedValue the appraisedValue of the asset being updated
     * @return the transferred asset
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public InsurancePolicy UpdateInsurancePolicy(final Context ctx, final String policyID, final String farmerID, final String farmerName, final String planName, final String condition, final int payoutAmount, final double coverageAmount, final double premiumAmount,  final String status) {
    
        if (!InsurancePolicyExists(ctx, policyID)) {
            String errorMessage = String.format("InsurancePolicy %s does not exist", policyID);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, InsurancePolicyTransferErrors.ASSET_NOT_FOUND.toString());
        }
    
        return putInsurancePolicy(ctx, new InsurancePolicy(policyID, farmerID, farmerName, planName, condition, payoutAmount, coverageAmount, premiumAmount,  status));
    }
    /**
     * Deletes asset on the ledger.
     *
     * @param ctx the transaction context
     * @param assetID the ID of the asset being deleted
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public void DeleteInsurancePolicy(final Context ctx, final String policyID) {
        if (!InsurancePolicyExists(ctx, policyID)) {
            String errorMessage = String.format("InsurancePolicy %s does not exist", policyID);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, InsurancePolicyTransferErrors.ASSET_NOT_FOUND.toString());
        }

        ctx.getStub().delState(policyID);
    }

    /**
     * Checks the existence of the asset on the ledger
     *
     * @param ctx the transaction context
     * @param assetID the ID of the asset
     * @return boolean indicating the existence of the asset
     */
    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public boolean InsurancePolicyExists(final Context ctx, final String policyID) {
        String assetJSON = ctx.getStub().getStringState(policyID);

        return (assetJSON != null && !assetJSON.isEmpty());
    }

    /**
     * Changes the owner of a asset on the ledger.
     *
     * @param ctx the transaction context
     * @param assetID the ID of the asset being transferred
     * @param newOwner the new owner
     * @return the old owner
     */
    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public String TransferInsurancePolicy(final Context ctx, final String farmerId, final String newOwner) {
        String assetJSON = ctx.getStub().getStringState(farmerId);

        if (assetJSON == null || assetJSON.isEmpty()) {
            String errorMessage = String.format("InsurancePolicy %s does not exist", farmerId);
            System.out.println(errorMessage);
            throw new ChaincodeException(errorMessage, InsurancePolicyTransferErrors.ASSET_NOT_FOUND.toString());
        }

        InsurancePolicy asset = genson.deserialize(assetJSON, InsurancePolicy.class);

        putInsurancePolicy(ctx, new InsurancePolicy (asset.getPolicyID(), asset.getFarmerID(), asset.getFarmerName(),asset.getPlanName(), asset.getCondition(), asset.getPayoutAmount(), asset.getCoverageAmount(), asset.getPremiumAmount(),  asset.getStatus()));

        return asset.getFarmerID();
    }

    /**
     * Retrieves all assets from the ledger.
     *
     * @param ctx the transaction context
     * @return array of assets found on the ledger
     */
    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String GetAllInsurancePolicys(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        List<InsurancePolicy> queryResults = new ArrayList<>();

        System.out.println("In GetAllInsurancePolicys");
        // To retrieve all assets from the ledger use getStateByRange with empty startKey & endKey.
        // Giving empty startKey & endKey is interpreted as all the keys from beginning to end.
        // As another example, if you use startKey = 'asset0', endKey = 'asset9' ,
        // then getStateByRange will retrieve asset with keys between asset0 (inclusive) and asset9 (exclusive) in lexical order.
        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

        for (KeyValue result: results) {

            InsurancePolicy asset = genson.deserialize(result.getStringValue(), InsurancePolicy.class);
            System.out.println(asset);
            queryResults.add(asset);
        }
        System.out.println("In GetAllInsurancePolicys" + queryResults);

        return genson.serialize(queryResults);
    }


@Transaction(intent = Transaction.TYPE.SUBMIT)
public void processPayout(Context ctx, String policyId, double payoutAmount) {
    ChaincodeStub stub = ctx.getStub();

    // Get the insurance policy from the ledger
    String policyJson = stub.getStringState(policyId);
    if (policyJson == null) {
        throw new ChaincodeException("Policy not found", "POLICY_NOT_FOUND");
    }
    InsurancePolicy policy = new Genson().deserialize(policyJson, InsurancePolicy.class);

     // Check if the policy is already paid
     if (policy.getStatus().equals("Paid")) {
        throw new ChaincodeException("Policy already paid", "POLICY_ALREADY_PAID");
    }

    // Check if the policy is active and has a valid payout amount
    if (policy.getStatus().equals("Active") && payoutAmount > 0) {
        // Calculate the payout amount based on the policy conditions
        double payout = calculatePayout(policy, payoutAmount);

        // Update the policy status to "Paid"
        policy.setStatus("Paid");

        // Update the policy premium amount
        policy.setPremiumAmount(policy.getPremiumAmount() - payout);

        // Put the updated policy back on the ledger
        stub.putStringState(policyId, new Genson().serialize(policy));

        // Create a new payout transaction
        PayoutTransaction payoutTx = new PayoutTransaction(policyId, payoutAmount, payout);
        stub.putState("PAYOUT_" + policyId, new Genson().serialize(payoutTx).getBytes());
    }  else if (policy.getStatus().equals("Active") && payoutAmount <= 0) {
        // Throw an exception if the payout amount is invalid
        throw new ChaincodeException("Invalid payout amount", "INVALID_PAYOUT_AMOUNT"); 
     } else {
        // Throw an exception if the policy is not active or the payout amount is invalid
        throw new ChaincodeException("Policy not found or not active", "POLICY_NOT_FOUND_OR_NOT_ACTIVE");
    }
}

// Helper function to calculate the payout amount based on the policy conditions
private double calculatePayout(InsurancePolicy policy, double payoutAmount) {
    // TO DO: implement the payout calculation logic based on the policy conditions
    // For example:
    if (policy.getCondition().equals("Good")) {
        return payoutAmount * 0.8;
    } else if (policy.getCondition().equals("Fair")) {
        return payoutAmount * 0.5;
    } else {
        return payoutAmount * 0.2;
    }
}

}