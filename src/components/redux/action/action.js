import { actionType } from "../constant/actionType";

export const typeBanner = (product) => {
  return {
    type: actionType.SET_BANNER,
    payload: product,
  };
};

export const checkEmail = (product) => {
  return {
    type: actionType.SET_EMAIL,
    payLoad: product,
  };
};
export const checkPassword = (product) => {
  return {
    type: actionType.SET_PASSWORD,
    payLoad: product,
  };
};

export const typeNewsfeed = (product) => {
  return {
    type: actionType.SET_NEWSFEED,
    payload: product,
  };
};
export const typeOfLikesPost = (product) => {
  return {
    type: actionType.SET_LIKES,
    payload: product,
  };
};
export const typeOfCompanyData = (product) => {
  return {
    type: actionType.SET_COMPANY_DATA,
    payload: product,
  };
};
export const typeOfDescriptionData = (product) => {
  return {
    type: actionType.SET_DESCRIPTION_DATA,
    payload: product,
  };
};
export const typeOfSkillsData = (product) => {
  return {
    type: actionType.SET_SKILLS_DATA,
    payload: product,
  };
};
export const typeOfEducationData = (product) => {
  return {
    type: actionType.SET_EDUCATION_DATA,
    payload: product,
  };
};
export const typeOfScholarshipData = (product) => {
  return {
    type: actionType.SET_SCHOLARSHIP_DATA,
    payload: product,
  };
};
export const typeOfExpereinceData = (product) => {
  return {
    type: actionType.SET_EXPERIENCE_DATA,
    payload: product,
  };
};
export const typeOfExpectedSalaryData = (product) => {
  return {
    type: actionType.SET_Salary_DATA,
    payload: product,
  };
};
export const typeOfModalToggle = (product) => {
  return {
    type: actionType.SET_DESCRIPTION_DATA,
    payload: product,
  };
};

export const typeOfProfileData = (product) => {
  return {
    type: actionType.SET_PROFILE_DATA_GET,
    payload: product,
  };
};
export const typeOfDegreeData = (product) => {
  return {
    type: actionType.SET_DEGREE_DATA,
    payload: product,
  };
};
export const typeOfFieldOfStudyData = (product) => {
  return {
    type: actionType.SET_FIELD_OF_STUDY_DATA,
    payload: product,
  };
};
export const typeOfUniversityData = (product) => {
  return {
    type: actionType.SET_UNIVERSITY_DATA,
    payload: product,
  };
};
export const typeOfMonthData = (product) => {
  return {
    type: actionType.SET_MONTH_DATA,
    payload: product,
  };
};
export const typeOfYearData = (product) => {
  return {
    type: actionType.SET_YEAR_DATA,
    payload: product,
  };
};
export const typeOfEducationToggle = (product) => {
  return {
    type: actionType.SET_EDUCATION_TOGGLE,
    payload: product,
  };
};
export const typeOfJobs = (product) => {
  return {
    type: actionType.SET_TYPE_OF_JOBS_DATA,
    payload: product,
  };
};
export const JobsToggle = (product) => {
  return {
    type: actionType.SET_JOBS_TOGGLE,
    payload: product,
  };
};
export const interestedWorkToggle = (product) => {
  return {
    type: actionType.SET_INTERESTED_WORK_TOGGLE,
    payload: product,
  };
};
export const companyLocationToggle = (product) => {
  return {
    type: actionType.SET_COMPANY_LOCATION_TOGGLE,
    payload: product,
  };
};

export const industryFieldModal = (product) => {
  return {
    type: actionType.SET_INDUSTRY_FIELD_TOGGLE,
    payload: product,
  };
};
export const ResumeModal = (product) => {
  return {
    type: actionType.SET_RESUME_TOGGLE,
    payload: product,
  };
};
export const LanguageModal = (product) => {
  return {
    type: actionType.SET_LANGUAGE_TOGGLE,
    payload: product,
  };
};
export const ScholarshipModal = (product) => {
  return {
    type: actionType.SET_SCHOLARSHIP_TOGGLE,
    payload: product,
  };
};
export const SkillsModal = (product) => {
  return {
    type: actionType.SET_SKILLS_TOGGLE,
    payload: product,
  };
};
export const SalaryModal = (product) => {
  return {
    type: actionType.SET_SALARY_TOGGLE,
    payload: product,
  };
};
export const ExpereinceModal = (product) => {
  return {
    type: actionType.SET_EXPERIENCE_TOGGLE,
    payload: product,
  };
};

export const setAllData = (type, product) => async (dispatch) => {
  dispatch({
    type: type,
    payload: product,
  });
};
