export const site = [
  {
    textTypes: ["비대면 채팅", "비대", "채팅"],
    text: "비대면 진료로 이동",
    site: "/clinic",
    linkText: "진료 바로가기",
  },
  {
    textTypes: ["약 이미지 검색", "약 이미지", "약", "이미지", "검색"],
    text: "약 이미지 검색을 지원합니다.",
    site: "/imageSearch",
    linkText: "이미지 검색하기",
  },
  {
    textTypes: ["병원 찾기", "병원"],
    text: "병원을 찾아드릴게요.",
    site: "/searchHospital",
    linkText: "병원 찾기",
  },
  {
    textTypes: ["약국 찾기", "약국"],
    text: "가까운 약국을 찾아드릴게요.",
    site: "/searchDrugStore",
    linkText: "약국 찾기",
  },
  {
    textTypes: ["마이페이지", "마이", "페이지"],
    text: "마이페이지 기능을 사용하실 수 있습니다.",
    site: "/user",
    linkText: "마이페이지로 이동",
  },
  {
    textTypes: ["정보수정", "정보", "수정"],
    text: "정보수정 기능을 이용해주세요.",
    site: "/user/profileEdit",
    linkText: "정보수정하러 가기",
  },
  {
    textTypes: ["결제수단", "결제", "수단"],
    text: "결제수단을 설정할 수 있습니다.",
    site: "/user/payment",
    linkText: "결제수단 설정하기",
  },
];

export const department = [
  {
    textTypes: ["가정의학과", "가정의학"],
    text: "가정의학과 정보를 보여드릴게요.",
    site: "/clinic/doctor",
    linkText: "가정의학과 바로가기",
    state: { subject: '가정의학과' } 
  },
  {
    textTypes: ["내과"],
    text: "내과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "내과 바로가기",
  },
  {
    textTypes: ["산부인과"],
    text: "산부인과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "산부인과 바로가기",
  },
  {
    textTypes: ["성형외과"],
    text: "성형외과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "성형외과 바로가기",
  },
  {
    textTypes: ["신경과"],
    text: "신경과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "신경과 바로가기",
  },
  {
    textTypes: ["안과"],
    text: "안과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "안과 바로가기",
  },
  {
    textTypes: ["치과"],
    text: "치과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "치과 바로가기",
  },
  {
    textTypes: ["이비인후과"],
    text: "이비인후과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "이비인후과 바로가기",
  },
  {
    textTypes: ["소아과"],
    text: "소아과 정보를 보여드릴게요.",
    site: "/clinic",
    linkText: "소아과 바로가기",
  },
];

export const symptoms = [
  {
    textTypes: ["눈", "안과", "근시", "각막염"],
    text: "안과에서 다루는 눈 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "안과 바로가기",
  },
  {
    textTypes: ["배", "소화", "복통", "속쓰림"],
    text: "내과에서 다루는 소화 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "내과 바로가기",
  },
  {
    textTypes: ["임신", "생리", "유방통", "산후우울증"],
    text: "산부인과에서 다루는 여성 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "산부인과 바로가기",
  },
  {
    textTypes: ["성형", "성형외과", "보톡스", "주름"],
    text: "성형외과에서 다루는 성형 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "성형외과 바로가기",
  },
  {
    textTypes: ["두통", "뇌", "뇌졸증", "두근거림"],
    text: "신경과에서 다루는 두통과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "신경과 바로가기",
  },
  {
    textTypes: ["치아", "치과", "충치", "치아교정"],
    text: "치과에서 다루는 치아 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "치과 바로가기",
  },
  {
    textTypes: ["코", "이비인후과", "코막힘", "코피부"],
    text: "이비인후과에서 다루는 코와 코 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "이비인후과 바로가기",
  },
  {
    textTypes: ["소아", "소아과", "발열", "소아비만"],
    text: "소아과에서 다루는 소아 관련 증상과 관련된 정보를 제공합니다.",
    site: "/clinic",
    linkText: "소아과 바로가기",
  },
];

export function handleTags(input, siteOrDepartmentOrSymptoms) {
    let text = "";
    let siteUrl = "";
    let linkText = "";
    let state= null;
    let tagsToCheck;
  
    switch (siteOrDepartmentOrSymptoms) {
      case "site":
        tagsToCheck = site;
        break;
      case "department":
        tagsToCheck = department;
        break;
      case "symptoms":
        tagsToCheck = symptoms;
        break;
      default:
        return { text: "Invalid type specified", site: "", linkText: "" };
    }
  
    for (const tagItem of tagsToCheck) {
      if (tagItem.textTypes.some(type => input.includes(type))) {
        text = tagItem.text;
        siteUrl = tagItem.site;
        linkText = tagItem.linkText;
        if (tagItem.state) { 
            state = tagItem.state;
          }
        break;
      }
    }
  
    return { text, site: siteUrl, linkText, state };
  }
  
  export function handleDefaultResponse() {
    return "죄송합니다. 메시지를 이해하지 못했습니다. 다시 말씀해주세요.";
  }
