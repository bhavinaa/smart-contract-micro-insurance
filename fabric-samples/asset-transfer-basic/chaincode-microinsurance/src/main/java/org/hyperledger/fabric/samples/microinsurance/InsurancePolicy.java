/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.microinsurance;

import java.util.Objects;
import java.time.LocalDate;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import com.owlike.genson.annotation.JsonIgnore;
import com.owlike.genson.annotation.JsonProperty;

@DataType()
public final class InsurancePolicy {
    @Property()
    public final String policyID;
    @Property()
    public final String farmerID;
    @Property()
    public final String farmerName;
    @Property()
    public final String planName;
    @Property()
    public final String condition;
    @Property()
    public final int payoutAmount;
    @Property()
    public final double coverageAmount;
    @Property()
    public  double premiumAmount;
   // @JsonIgnore
    //public final LocalDate startDate;
    //@JsonIgnore
    //public final LocalDate endDate;
    @Property()
    private String status;

    public InsurancePolicy(@JsonProperty("policyID") String policyID,
                           @JsonProperty("farmerID") String farmerID,
                           @JsonProperty("farmerName") String farmerName,
                           @JsonProperty("planName") String planName,
                           @JsonProperty("condition") String condition,
                           @JsonProperty("payoutAmount") int payoutAmount,
                           @JsonProperty("coverageAmount") double coverageAmount,
                           @JsonProperty("premiumAmount") double premiumAmount,
                           @JsonProperty("status") String status) {
        this.policyID = policyID;
        this.farmerID = farmerID;
        this.farmerName = farmerName;
        this.planName = planName;
        this.condition = condition;
        this.payoutAmount = payoutAmount;
        this.coverageAmount = coverageAmount;
        this.premiumAmount = premiumAmount;
       // this.startDate = startDate;
       // this.endDate = endDate;
        this.status = status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(policyID, farmerID, farmerName, planName, condition, payoutAmount, coverageAmount, premiumAmount,  status);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        InsurancePolicy other = (InsurancePolicy) obj;
        return Objects.equals(policyID, other.policyID) &&
               Objects.equals(farmerID, other.farmerID) &&
               Objects.equals(farmerName, other.farmerName) &&
               Objects.equals(planName, other.planName) &&
               Objects.equals(condition, other.condition) &&
               payoutAmount == other.payoutAmount &&
               coverageAmount == other.coverageAmount &&
               premiumAmount == other.premiumAmount &&
             //  Objects.equals(startDate, other.startDate) &&
              // Objects.equals(endDate, other.endDate) &&
               Objects.equals(status, other.status);
    }

    public String getPolicyID() { return policyID; }
    public String getFarmerID() { return farmerID; }
    public String getFarmerName() { return farmerName; }
    public String getPlanName() { return planName; }
    public String getCondition() { return condition; }
    public int getPayoutAmount() { return payoutAmount; }
    public double getCoverageAmount() { return coverageAmount; }
    public double getPremiumAmount() { return premiumAmount; }
   
    public void setPremiumAmount(double premiumAmount) { this.premiumAmount = premiumAmount; }
   // public LocalDate getStartDate() { return startDate; }
   // public LocalDate getEndDate() { return endDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
