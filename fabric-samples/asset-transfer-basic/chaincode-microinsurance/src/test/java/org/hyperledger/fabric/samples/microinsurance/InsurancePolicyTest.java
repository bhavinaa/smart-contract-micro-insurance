/*
 * SPDX-License-Identifier: Apache-2.0
 */

 package org.hyperledger.fabric.samples.microinsurance;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

//import java.time.LocalDate;
//import java.util.Date;

public final class InsurancePolicyTest {

    @Nested
    class Equality {

        @Test
        public void isReflexive() {

             // Create a Date object for startDate and endDate
            
          //   LocalDate startDate = LocalDate.of(2024, 3, 16);
            // LocalDate endDate = LocalDate.of(2026,3,16);

              // Create an InsurancePolicy instance using the constructor
          InsurancePolicy policy = new InsurancePolicy(
            "P12345",
            "F98765",
            "John Doe",
            "Basic Plan",
            "Flood",
            10000,
            50000.75,
            2500.50,
       //     startDate,
         //   endDate,
            "Active"
        );

            assertThat(policy).isEqualTo(policy);
        }

        @Test
        public void isSymmetric() {
              // Create a Date object for startDate and endDate
      //  LocalDate startDate = LocalDate.of(2024, 3, 16);
       // LocalDate endDate = LocalDate.of(2026,3,16);

              // Create an InsurancePolicy instance using the constructor
        InsurancePolicy policyA= new InsurancePolicy(
            "P12345",
            "F98765",
            "John Doe",
            "Basic Plan",
            "Flood",
            10000,
            50000.75,
            2500.50,
          //  startDate,
           // endDate,
            "Active"
        );


        InsurancePolicy policyB= new InsurancePolicy(
            "P12345",
            "F98765",
            "John Doe",
            "Basic Plan",
            "Flood",
            10000,
            50000.75,
            2500.50,
          //  startDate,
           // endDate,
            "Active"
        );

            assertThat(policyA).isEqualTo(policyB);
            assertThat(policyB).isEqualTo(policyA);
        }

        @Test
        public void isTransitive() {

         //   LocalDate startDate = LocalDate.of(2024, 3, 16);
          //  LocalDate endDate = LocalDate.of(2026,3,16);
            
            // Create an InsurancePolicy instance using the constructor
            InsurancePolicy policyA= new InsurancePolicy(
                "P12345",
                "F98765",
                "John Doe",
                "Basic Plan",
                "Flood",
                10000,
                50000.75,
                2500.50,
               // startDate,
               // endDate,
                "Active"
            );

                  // Create an InsurancePolicy instance using the constructor
            InsurancePolicy policyB= new InsurancePolicy(
                "P12345",
                "F98765",
                "John Doe",
                "Basic Plan",
                "Flood",
                10000,
                50000.75,
                2500.50,
             //   startDate,
              //  endDate,
                "Active"
            );

                  // Create an InsurancePolicy instance using the constructor
         InsurancePolicy policyC= new InsurancePolicy(
            "P12345",
            "F98765",
            "John Doe",
            "Basic Plan",
            "Flood",
            10000,
            50000.75,
            2500.50,
           // startDate,
         //   endDate,
            "Active"
                );

            assertThat(policyA).isEqualTo(policyB);
            assertThat(policyB).isEqualTo(policyC);
            assertThat(policyA).isEqualTo(policyC);
        }

        @Test
        public void handlesInequality() {
           // LocalDate startDate = LocalDate.of(2024, 3, 16);
            //LocalDate endDate = LocalDate.of(2026,3,16);
                    // Create an InsurancePolicy instance using the constructor
                    InsurancePolicy policyA= new InsurancePolicy(
                        "P12345",
                        "F98765",
                        "John Doe",
                        "Basic Plan",
                        "Flood",
                        10000,
                        50000.75,
                        2500.50,
                    //    startDate,
                      //  endDate,
                        "Active"
                    );
        
                          // Create an InsurancePolicy instance using the constructor
                    InsurancePolicy policyB= new InsurancePolicy(
                        "P123458",
                        "F98768",
                        "John Hopkins",
                        "Basic Plan",
                        "Flood",
                        10000,
                        50000.75,
                        2500.50,
                     //   startDate,
                      //  endDate,
                        "Active"
                    );
        
        

            assertThat(policyA).isNotEqualTo(policyB);
        }

        @Test
        public void handlesOtherObjects() {


         //   LocalDate startDate = LocalDate.of(2024, 3, 16);
          //  LocalDate endDate = LocalDate.of(2026,3,16);

            InsurancePolicy policyA= new InsurancePolicy(
                "P123467",
                "F98760",
                "Saindhavi",
                "Basic Plan",
                "Flood",
                10000,
                50000.75,
                2500.50,
              //  startDate,
                // endDate,
                "Active"
            );

            String assetB = "not a asset";

            assertThat(policyA).isNotEqualTo(assetB);
        }

        @Test
        public void handlesNull() {
          //  LocalDate startDate = LocalDate.of(2024, 3, 16);
           // LocalDate endDate = LocalDate.of(2026,3,16);

            InsurancePolicy policyA= new InsurancePolicy(
                "P123467",
                "F98760",
                "Saindhavi",
                "Basic Plan",
                "Flood",
                10000,
                50000.75,
                2500.50,
              //  startDate,
               // endDate,
                "Active"
            );

            assertThat(policyA).isNotEqualTo(null);
        }
    }

    /*
    @Test
    public void toStringIdentifiesInsurancePolicy() {

        InsurancePolicy asset = new InsurancePolicy("farmer1", "insects", 2000, "active");


        assertThat(asset.toString()).isEqualTo("InsurancePolicy@e04f6c53 [assetID=asset1, color=Blue, size=20, owner=Guy, appraisedValue=100]");
    }
         */
}

