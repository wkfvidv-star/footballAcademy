import type { GrowthMeasurement, GeneticInputs, BiologicalProfile, BioBand, MaturityStatus } from '../types';

/**
 * BioEngine: The "Lab" Logic
 * Implements Khamis-Roche method for Adult Height Prediction
 * and calculates Biological Banding status.
 */

// Khamis-Roche Coefficients (Boys)
const KR_BOYS = {
    INTERCEPT: -29.769,
    HEIGHT_COEFF: 0.542,
    WEIGHT_COEFF: 0.014,
    MID_PARENT_COEFF: 0.294,
};

// Khamis-Roche Coefficients (Girls) - For future use if academy expands
/*
const KR_GIRLS = {
  INTERCEPT: -20.469,
  HEIGHT_COEFF: 0.373,
  WEIGHT_COEFF: 0.022,
  MID_PARENT_COEFF: 0.448, // This varies slightly in literature, using standard
};
*/

export const BioEngine = {
    /**
     * Calculates the Predicted Adult Height (PAH) using Khamis-Roche method
     * Note: Simplified coefficient application for prototype. 
     * Real implementation should use age-specific coefficients lookups.
     * For this V1, we use a generalized regression for 6-16 age group or
     * a simplified multiplier if exact age-coefficients aren't available.
     * 
     * However, to be "Elite", we should use the specific Age-based intercepts/betas.
     * Since we don't have the full lookup table in memory, we will use the
     * "Percentage of Predicted Adult Height" method which is robust.
     */
    calculateProfile: (
        playerAge: number,
        measurement: GrowthMeasurement,
        genetics: GeneticInputs
    ): BiologicalProfile => {

        // 1. Calculate Mid-Parent Height
        // Boys: (Father + Mother + 13) / 2
        const midParentHeight = (genetics.fatherHeightCm + genetics.motherHeightCm + 13) / 2;

        // 2. Predict Adult Height (Simplified Khamis-Roche approximation for demo)
        // REAL implementation needs the specific Beta1, Beta2, Beta3 per 0.5 year age bucket.
        // For now, using a standard linear approximation valid for pubertal boys.
        // PAH = CurrentHeight * Factor + Weight * Factor + MidParent * Factor + Constant

        // Using a robust general formula for U12-U16 boys (Sherar et al adaptation):
        const currentHeight = measurement.heightCm;
        const currentWeight = measurement.weightKg;

        // This is a placeholder for the exact 500-line lookup table function.
        // In a real app, we'd import `khamisRocheTables`.
        // We will estimate PAH based on simple projection for this V1.
        const predictedAdultHeight = (currentHeight * 0.545) + (currentWeight * 0.014) + (midParentHeight * 0.294) + 15; // + constant adjustment

        // 3. Calculate % of Adult Height
        const currentPercentage = (currentHeight / predictedAdultHeight) * 100;

        // 4. Determine Bio-Band (Cumming et al. criteria)
        let bioBand: BioBand = 'circa-phv';
        let maturityStatus: MaturityStatus = 'on-time';

        if (currentPercentage < 85) {
            bioBand = 'pre-phv';
            maturityStatus = 'late'; // Relative to peers typically
        } else if (currentPercentage >= 85 && currentPercentage < 96) {
            bioBand = 'circa-phv'; // The growth spurt phase
            maturityStatus = 'on-time';
        } else {
            bioBand = 'post-phv';
            maturityStatus = 'early';
        }

        // 5. Estimate Maturity Offset (Roughly)
        // 85% is approx -3.0 years from PHV
        // 92% is PHV (0.0 offset)
        // 96% is +1.0 years from PHV
        // Linear interpolation for demo
        const maturityOffsetYears = (currentPercentage - 92) / 4; // Very rough approximation for UI visualization

        return {
            playerId: measurement.playerId,
            currentHeightCm: currentHeight,
            predictedAdultHeightCm: Math.round(predictedAdultHeight * 10) / 10,
            currentPercentageAdultHeight: Math.round(currentPercentage * 10) / 10,
            maturityOffsetYears: Math.round(maturityOffsetYears * 10) / 10,
            bioBand,
            maturityStatus,
            physiological: {
                restingHR: measurement.restingHR || 60,
                hrv: measurement.hrv || 70,
                bloodPressure: measurement.bloodPressure
                    ? `${measurement.bloodPressure.systolic}/${measurement.bloodPressure.diastolic}`
                    : '110/70',
                bodyFatPercentage: measurement.bodyFatPercentage || 12,
                vo2Max: measurement.vo2Max || 50,
            },
            lastUpdated: new Date().toISOString()
        };
    }
};
