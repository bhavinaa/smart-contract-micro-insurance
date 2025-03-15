package org.hyperledger.fabric.samples.microinsurance;

import com.owlike.genson.annotation.JsonProperty;

// PayoutTransaction class to store the payout transaction details
class PayoutTransaction {
    @JsonProperty("policyId")
    private String policyId;
   
    @JsonProperty("payoutAmount") 
    private double payoutAmount;
   
    @JsonProperty("amount")
    private double actualPayout;

    public PayoutTransaction() {}
    
    public PayoutTransaction(String policyId, double payoutAmount, double actualPayout) {
        this.policyId = policyId;
        this.payoutAmount = payoutAmount;
        this.actualPayout = actualPayout;
    }

    // Getters and setters
    public String getPolicyId() {
        return policyId;
    }

    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }

    public double getPayoutAmount() {
        return payoutAmount;
    }

    public void setPayoutAmount(double payoutAmount) {
        this.payoutAmount = payoutAmount;
    }

    public double getActualPayout() {
        return actualPayout;
    }

    public void setActualPayout(double actualPayout) {
        this.actualPayout = actualPayout;
    }
}