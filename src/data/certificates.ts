export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  credentialUrl: string;
}

export const certificates: Certificate[] = [
  // NASSCOM
  {
    id: "nasscom-cybersecurity",
    title: "Cybersecurity Fundamentals",
    issuer: "Nasscom",
    date: "2024",
    credentialUrl: "/certificates/CyberSecurity_Fundamentals_Nasscom.pdf",
  },
  {
    id: "nasscom-uipath",
    title: "UiPath Automation Developer Associate",
    issuer: "Nasscom",
    date: "2024",
    credentialUrl: "/certificates/Nasscom_UiPath_Automation_Developer_Associate.pdf",
  },
  // ORACLE
  {
    id: "oracle-cloud-infrastructure",
    title: "Oracle Cloud Infrastructure 2024 Foundations Associate",
    issuer: "Oracle",
    date: "2024",
    credentialUrl: "/certificates/Oracle_Cloud_infrastructure_2024.pdf",
  },
  // OTHERS
  {
    id: "aws-solutions-architecture",
    title: "AWS Solutions Architecture Job Simulation",
    issuer: "Forage / AWS",
    date: "2024",
    credentialUrl: "/certificates/AWS_Solutions_Architecture_Job_Simulation.pdf",
  },
  {
    id: "cisco-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "2024",
    credentialUrl: "/certificates/Cisco_CyberSecurity_introduction.pdf",
  },
  {
    id: "coursera-excel",
    title: "MS Excel",
    issuer: "Coursera",
    date: "2024",
    credentialUrl: "/certificates/Coursera_MS_Excel.pdf",
  },
  {
    id: "servicenow-cert",
    title: "ServiceNow Certification",
    issuer: "ServiceNow",
    date: "2024",
    credentialUrl: "/certificates/Certificate - ServiceNow.pdf",
  },
  {
    id: "udemy-fullstack",
    title: "The Full Stack",
    issuer: "Udemy",
    date: "2024",
    credentialUrl: "/certificates/TheFullStack_UDEMY_Certi.pdf",
  },
  {
    id: "hcl-guvi",
    title: "HCL GUVI Certification",
    issuer: "GUVI",
    date: "2024",
    credentialUrl: "/certificates/HCL GUVI Certification - N631417200rnz8681m.png",
  },
  // INFOSYS
  {
    id: "infosys-python-course",
    title: "Python Course",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/infosys_course_python.pdf",
  },
  {
    id: "infosys-intro-python",
    title: "Introduction to Python",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_intro_python.pdf",
  },
  {
    id: "infosys-python-foundation",
    title: "Python Foundation Certification",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_python foundation certification.pdf",
  },
  {
    id: "infosys-java-developer",
    title: "Java Developer",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_Java_Developer.pdf",
  },
  {
    id: "infosys-java-fundamentals",
    title: "Java Fundamentals",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_javafundamentals.pdf",
  },
  {
    id: "infosys-java-tools",
    title: "Java Tools",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_javatools.pdf",
  },
  {
    id: "infosys-java-se-features",
    title: "Java SE Features",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_java se features.pdf",
  },
  {
    id: "infosys-java-language-features",
    title: "Java Language Features",
    issuer: "Infosys Springboard",
    date: "2024",
    credentialUrl: "/certificates/Infosys_SpringBoard_java_language_features.pdf",
  },
];
