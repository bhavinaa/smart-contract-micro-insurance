/*
 * SPDX-License-Identifier: Apache-2.0
 */

 package org.hyperledger.fabric.samples.microinsurance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InOrder;

import com.owlike.genson.Genson;
import com.owlike.genson.GensonBuilder;
import java.util.Arrays;
//import static org.hamcrest.Matchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;


public final class InsuranceContractTest {

     //private final Genson genson = new Genson();
private final Genson genson = new GensonBuilder()
                                        .create();

    private static final class MockKeyValue implements KeyValue {

        private final String key;
        private final String value;

        MockKeyValue(final String key, final String value) {
            super();
            this.key = key;
            this.value = value;
        }

        @Override
        public String getKey() {
            return this.key;
        }

        @Override
        public String getStringValue() {
            return this.value;
        }

        @Override
        public byte[] getValue() {
            return this.value.getBytes();
        }

    }

    private static final class MockAssetResultsIterator implements QueryResultsIterator<KeyValue> {

        private final List<KeyValue> assetList;

           
               MockAssetResultsIterator() {
                   super();
           
                   assetList = new ArrayList<KeyValue>();
           
                   assetList.add(new MockKeyValue("policy1",
                           "{ \"policyID\": \"policy1\", \"farmerID\": \"farmer123\", \"farmerName\": \"John Doe\", \"planName\": \"Plan A\", \"condition\": \"Good\", \"payoutAmount\": 1000, \"coverageAmount\": 5000.0, \"premiumAmount\": 200.0,   \"status\": \"Active\" }"));
                   assetList.add(new MockKeyValue("policy2",
                           "{ \"policyID\": \"policy2\", \"farmerID\": \"farmer456\", \"farmerName\": \"Jane Doe\", \"planName\": \"Plan B\", \"condition\": \"Fair\", \"payoutAmount\": 2000, \"coverageAmount\": 10000.0, \"premiumAmount\": 400.0,  \"status\": \"Active\" }"));
                   assetList.add(new MockKeyValue("policy3",
                           "{ \"policyID\": \"policy3\", \"farmerID\": \"farmer789\", \"farmerName\": \"Bob Smith\", \"planName\": \"Plan C\", \"condition\": \"Poor\", \"payoutAmount\": 3000, \"coverageAmount\": 15000.0, \"premiumAmount\": 600.0,  \"status\": \"Active\" }"));
               }
           
               @Override
               public Iterator<KeyValue> iterator() {
                   return assetList.iterator();
               }
           
               @Override
               public void close() throws Exception {
                   // do nothing
               }
           
        }

    @Test
    public void invokeUnknownTransaction() {
        InsuranceContract contract = new InsuranceContract();
        Context ctx = mock(Context.class);

        Throwable thrown = catchThrowable(() -> {
            contract.unknownTransaction(ctx);
        });

        assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                .hasMessage("Undefined contract method called");
        assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo(null);

        verifyNoInteractions(ctx);
    }


  
    @Nested
    class InvokeReadAssetTransaction {

        @Test
        public void whenAssetExists() {
            InsuranceContract contract = new InsuranceContract();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("policy1")).thenReturn(
                    "{ \"policyID\": \"policy1\", \"farmerID\": \"farmer123\", \"farmerName\": \"John Doe\", \"planName\": \"Plan A\", \"condition\": \"Good\", \"payoutAmount\": 1000, \"coverageAmount\": 5000.0, \"premiumAmount\": 200.0, \"startDate\": \"2022-01-01\", \"endDate\": \"2022-12-31\", \"status\": \"Active\" }");

            InsurancePolicy asset = contract.ReadInsurancePolicy(ctx, "policy1");

            assertThat(asset).isEqualTo(new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0,  "Active"));
        }

        @Test
        public void whenAssetDoesNotExist() {
            InsuranceContract contract = new InsuranceContract();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("policy1")).thenReturn("");

            Throwable thrown = catchThrowable(() -> {
                contract.ReadInsurancePolicy(ctx, "policy1");
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("InsurancePolicy policy1 does not exist");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
        }
    }

            @Test
            void invokeInitLedgerTransaction() {
                InsuranceContract contract = new InsuranceContract();
                Context ctx = mock(Context.class);
                ChaincodeStub stub = mock(ChaincodeStub.class);
                when(ctx.getStub()).thenReturn(stub);
        
                contract.InitLedger(ctx);
        
                InOrder inOrder = inOrder(stub);

                InsurancePolicy policy1 = new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Active");
                InsurancePolicy policy2 = new InsurancePolicy("policy2", "farmer456", "Jane Doe", "Plan B", "Fair", 2000, 10000.0, 400.0, "Active");
                InsurancePolicy policy3 = new InsurancePolicy("policy3", "farmer789", "Bob Smith", "Plan C", "Poor", 3000, 15000.0, 600.0, "Active");
            
                String policy1Json = new Genson().serialize(policy1);
                String policy2Json = new Genson().serialize(policy2);
                String policy3Json = new Genson().serialize(policy3);
            
                inOrder.verify(stub).putStringState("policy1", policy1Json);
                inOrder.verify(stub).putStringState("policy2", policy2Json);
                inOrder.verify(stub).putStringState("policy3", policy3Json);
         

                /* 
                InsurancePolicy[] expectedAssets = {
                        new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Active"),
                        new InsurancePolicy("policy2", "farmer456", "Jane Doe", "Plan B", "Fair", 2000, 10000.0, 400.0, "Active"),
                        new InsurancePolicy("policy3", "farmer789", "Bob Smith", "Plan C", "Poor", 3000, 15000.0, 600.0, "Active")
                };

           
                inOrder.verify(stub).putStringState("policy1",expectedAssets[0].toString());
                
                System.out.println("In invokeInitLedgerTransaction" + results);
                     List<InsurancePolicy> actualAssets = new ArrayList<>();
                QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

                for (KeyValue result: results) {
                    InsurancePolicy asset = genson.deserialize(result.getStringValue(), InsurancePolicy.class);
                    actualAssets.add(asset);
                }

                assertThat(actualAssets).containsExactlyInAnyOrder(expectedAssets);
                */
            }

        
            @Nested
            class InvokeCreateAssetTransaction {
        
                @Test
                public void whenAssetExists() {
                    InsuranceContract contract = new InsuranceContract();
                    Context ctx = mock(Context.class);
                    ChaincodeStub stub = mock(ChaincodeStub.class);
                    when(ctx.getStub()).thenReturn(stub);
                    when(stub.getStringState("policy1"))
                            .thenReturn("{ \"policyID\": \"policy1\", \"farmerID\": \"F98760\", \"farmerName\": \"Saindhavi\", \"planName\": \"Basic Plan\", \"condition\": \"Flood\", \"payoutAmount\": 10000, \"coverageAmount\": 50000.75, \"premiumAmount\": 2500.50,  \"status\": \"Active\" }");
        
                    Throwable thrown = catchThrowable(() -> {
                        contract.CreateInsurancePolicy(ctx, "policy1", "F98760", "Saindhavi", "Basic Plan", "Flood", 10000, 50000.75, 2500.50, "Active");
                    });
        
                    assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                            .hasMessage("InsurancePolicy policy1 already exists");
                    assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_ALREADY_EXISTS".getBytes());
                }
        
                @Test
                public void whenAssetDoesNotExist() {
                    InsuranceContract contract = new InsuranceContract();
                    Context ctx = mock(Context.class);
                    ChaincodeStub stub = mock(ChaincodeStub.class);
                    when(ctx.getStub()).thenReturn(stub);
                    when(stub.getStringState("policy1")).thenReturn("");
        
                    InsurancePolicy policy = contract.CreateInsurancePolicy(ctx, "policy1", "F98760", "Saindhavi", "Basic Plan", "Flood", 10000, 50000.75, 2500.50, "Active");
        
                    assertThat(policy).isEqualTo(new InsurancePolicy("policy1", "F98760", "Saindhavi", "Basic Plan", "Flood", 10000, 50000.75, 2500.50, "Active"));
                }
    }

    @Test
    void invokeGetAllAssetsTransaction() {
        InsuranceContract contract = new InsuranceContract();
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);
        when(stub.getStateByRange("", "")).thenReturn(new MockAssetResultsIterator());

        String assets = contract.GetAllInsurancePolicys(ctx);

        System.out.println(assets);

        // Parse the JSON string into an array of InsurancePolicy objects
    JSONArray jsonArray = new JSONArray(assets);
    InsurancePolicy[] actualAssets = new InsurancePolicy[jsonArray.length()];
    for (int i = 0; i < jsonArray.length(); i++) {
        JSONObject jsonObject = jsonArray.getJSONObject(i);
        actualAssets[i] = new InsurancePolicy(
                jsonObject.getString("policyID"),
                jsonObject.getString("farmerID"),
                jsonObject.getString("farmerName"),
                jsonObject.getString("planName"),
                jsonObject.getString("condition"),
                jsonObject.getInt("payoutAmount"),
                jsonObject.getDouble("coverageAmount"),
                jsonObject.getDouble("premiumAmount"),
                jsonObject.getString("status")
        );
    }

    // Define the expected assets
    InsurancePolicy[] expectedAssets = new InsurancePolicy[] {
            new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Active"),
            new InsurancePolicy("policy2", "farmer456", "Jane Doe", "Plan B", "Fair", 2000, 10000.0, 400.0, "Active"),
            new InsurancePolicy("policy3", "farmer789", "Bob Smith", "Plan C", "Poor", 3000, 15000.0, 600.0, "Active")
    };

    // Compare the actual and expected assets
    assertThat(actualAssets).containsExactlyInAnyOrder(expectedAssets);

       
    }


    @Test
    public void testProcessPayout_ValidPolicyAndPayoutAmount() {
        // Mock the context and stub
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);
    
        // Create a mock insurance policy
        InsurancePolicy policy = new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Active");
    
        // Serialize the policy and store it on the ledger
        String policyJson = new Genson().serialize(policy);
        when(stub.getStringState("policy1")).thenReturn(policyJson);
    
        // Call the processPayout method
        InsuranceContract contract = new InsuranceContract();
        contract.processPayout(ctx, "policy1", 100.0);
          // Create an updated policy with the status "Paid"
    InsurancePolicy updatedPolicy = new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Paid");
        when(stub.getStringState("policy1")).thenReturn(new Genson().serialize(updatedPolicy));
        // Verify that the policy status was updated to "Paid"
        InsurancePolicy resultPolicy = new Genson().deserialize(stub.getStringState("policy1"), InsurancePolicy.class);
        assertThat(resultPolicy.getStatus()).isEqualTo("Paid");
    
       // Mock the stub to return the payout transaction
    when(stub.getState("PAYOUT_policy1")).thenReturn(new Genson().serialize(new PayoutTransaction("policy1", 100.0, 100.0)).getBytes());
        // Verify that a new payout transaction was created
        PayoutTransaction payoutTx = new Genson().deserialize(stub.getState("PAYOUT_policy1"), PayoutTransaction.class);
        assertThat(payoutTx.getPolicyId()).isEqualTo("policy1");
        assertThat(payoutTx.getPayoutAmount()).isEqualTo(100.0);
    }
    
    @Test
    public void testProcessPayout_InvalidPolicy() {
        // Mock the context and stub
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);
    
        // Call the processPayout method with an invalid policy ID
        InsuranceContract contract = new InsuranceContract();
        Throwable thrown = catchThrowable(() -> contract.processPayout(ctx, "invalidPolicy", 100.0));
    
        // Verify that a ChaincodeException was thrown
        assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                .hasMessage("Policy not found");
    }
    
    @Test
    public void testProcessPayout_InvalidPayoutAmount() {
        // Mock the context and stub
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);
    
        // Create a mock insurance policy
        InsurancePolicy policy = new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Active");
    
        // Serialize the policy and store it on the ledger
        String policyJson = new Genson().serialize(policy);
        when(stub.getStringState("policy1")).thenReturn(policyJson);
    
        // Call the processPayout method with an invalid payout amount
        InsuranceContract contract = new InsuranceContract();
        Throwable thrown = catchThrowable(() -> contract.processPayout(ctx, "policy1", -100.0));
    
        // Verify that a ChaincodeException was thrown
        assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                .hasMessage("Invalid payout amount");
    }
    
    @Test
    public void testProcessPayout_PolicyAlreadyPaid() {
        // Mock the context and stub
        Context ctx = mock(Context.class);
        ChaincodeStub stub = mock(ChaincodeStub.class);
        when(ctx.getStub()).thenReturn(stub);
    
        // Create a mock insurance policy with status "Paid"
        InsurancePolicy policy = new InsurancePolicy("policy1", "farmer123", "John Doe", "Plan A", "Good", 1000, 5000.0, 200.0, "Paid");
    
        // Serialize the policy and store it on the ledger
        String policyJson = new Genson().serialize(policy);
        when(stub.getStringState("policy1")).thenReturn(policyJson);
    
        // Call the processPayout method
        InsuranceContract contract = new InsuranceContract();
        Throwable thrown = catchThrowable(() -> contract.processPayout(ctx, "policy1", 100.0));
    
        // Verify that a ChaincodeException was thrown
        assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                .hasMessage("Policy already paid");
    }
}
   
    @Nested
    class DeleteAssetTransaction {

        @Test
        public void whenAssetDoesNotExist() {
            InsuranceContract contract = new InsuranceContract();
            Context ctx = mock(Context.class);
            ChaincodeStub stub = mock(ChaincodeStub.class);
            when(ctx.getStub()).thenReturn(stub);
            when(stub.getStringState("policy1")).thenReturn("");

            Throwable thrown = catchThrowable(() -> {
                contract.DeleteInsurancePolicy(ctx, "policy1");
            });

            assertThat(thrown).isInstanceOf(ChaincodeException.class).hasNoCause()
                    .hasMessage("InsurancePolicy policy1 does not exist");
            assertThat(((ChaincodeException) thrown).getPayload()).isEqualTo("ASSET_NOT_FOUND".getBytes());
        }
    } 