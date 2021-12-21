import { actionType } from "../constant/actionType";
const initialState = {
  email: "",
  password: "",
  setBannerData: [],
  setNewfeedData: [],
  setLikesData: [],
  setData: null,
  setFavoriteCompanyData: [],
  setDescriptionData: [],
  setSkillsData: [],
  setScholarshipData: [],
  setModalToggle: false,
  setEducationData: [],
  setProfileData: [],
  setDegreeData: [],
  setFieldOfStudyData: [],
  setUniversityData: [],
  setMonthData: [],
  setYearData: [],
  setEducationToggle: false,
  setTypeOfJobsData: [],
  setJobsToggle: false,
  setInterestedToggle: false,
  setCompanyLocationToggle: false,
  setIdustryFieldToggle: false,
  setResumeToggle: false,
  setLanguageToggle: false,
  setScholarshipToggle: false,
  setSkillsToggle: false,
  setSalaryToggle: false,
  setSalaryData: [],
  setExpereinceData: [],
  setExpereinceToggle: false,
};

export const setBanner = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_BANNER:
      return {
        ...state,
        setBannerData: payload,
      };
    case actionType.SET_NEWSFEED:
      return {
        ...state,
        setNewfeedData: payload,
      };
    case actionType.SET_LIKES:
      return {
        ...state,
        setLikesData: payload,
      };
    case actionType.SET_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case actionType.SET_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    case actionType.USER_DATA:
      return {
        ...state,
        setData: payload,
      };
    case actionType.SET_FAVORITE_COMPANY:
      return {
        ...state,
        setFavoriteCompanyData: payload,
      };
    case actionType.SET_DESCRIPTION_DATA:
      return {
        ...state,
        setDescriptionData: payload,
      };
    case actionType.SET_SKILLS_DATA:
      return {
        ...state,
        setSkillsData: payload,
      };
    case actionType.SET_SCHOLARSHIP_DATA:
      return {
        ...state,
        setScholarshipData: payload,
      };
    case actionType.SET_MODAL_TOGGLE:
      return {
        ...state,
        setModalToggle: payload,
      };
    case actionType.SET_EDUCATION_DATA:
      return {
        ...state,
        setEducationData: payload,
      };
    case actionType.SET_PROFILE_DATA_GET:
      return {
        ...state,
        setProfileData: payload,
      };
    case actionType.SET_DEGREE_DATA:
      return {
        ...state,
        setDegreeData: payload,
      };
    case actionType.SET_FIELD_OF_STUDY_DATA:
      return {
        ...state,
        setFieldOfStudyData: payload,
      };
    case actionType.SET_SALARY_DATA:
      return {
        ...state,
        setSalaryData: payload,
      };
    case actionType.SET_UNIVERSITY_DATA:
      return {
        ...state,
        setUniversityData: payload,
      };
    case actionType.SET_MONTH_DATA:
      return {
        ...state,
        setMonthData: payload,
      };
    case actionType.SET_YEAR_DATA:
      return {
        ...state,
        setYearData: payload,
      };
    case actionType.SET_EXPERIENCE_DATA:
      return {
        ...state,
        setExpereinceData: payload,
      };
    case actionType.SET_EDUCATION_TOGGLE:
      return {
        ...state,
        setEducationToggle: payload,
      };
    case actionType.SET_TYPE_OF_JOBS_DATA:
      return {
        ...state,
        setTypeOfJobsData: payload,
      };
    case actionType.SET_JOBS_TOGGLE:
      return {
        ...state,
        setJobsToggle: payload,
      };
    case actionType.SET_INTERESTED_WORK_TOGGLE:
      return {
        ...state,
        setInterestedToggle: payload,
      };
    case actionType.SET_COMPANY_LOCATION_TOGGLE:
      return {
        ...state,
        setCompanyLocationToggle: payload,
      };
    case actionType.SET_INDUSTRY_FIELD_TOGGLE:
      return {
        ...state,
        setIdustryFieldToggle: payload,
      };
    case actionType.SET_RESUME_TOGGLE:
      return {
        ...state,
        setResumeToggle: payload,
      };
    case actionType.SET_LANGUAGE_TOGGLE:
      return {
        ...state,
        setLanguageToggle: payload,
      };
    case actionType.SET_SCHOLARSHIP_TOGGLE:
      return {
        ...state,
        setScholarshipToggle: payload,
      };
    case actionType.SET_SKILLS_TOGGLE:
      return {
        ...state,
        setSkillsToggle: payload,
      };
    case actionType.SET_SALARY_TOGGLE:
      return {
        ...state,
        setSalaryToggle: payload,
      };
    case actionType.SET_EXPERIENCE_TOGGLE:
      return {
        ...state,
        setExpereinceToggle: payload,
      };
    default:
      return state;
  }
};
