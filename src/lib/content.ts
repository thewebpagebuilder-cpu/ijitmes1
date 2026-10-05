export type Article = {
  paperId: string;
  title: string;
  authors: string[];
  volume: string;
  issue: string;
  published: string;
  abstract: string;
  fileUrl: string;
  field: string;
};

export const articles: Article[] = [
  {
    paperId: "IJITMES-00069",
    title: "Wireless Power Transfer for EV Charging",
    authors: ["Pratiksha J. Shinde"],
    volume: "1",
    issue: "7",
    published: "11 December 2025",
    field: "Electrical Engineering",
    fileUrl: "https://ijitmes.com/admin/uploads/papers/1766586084_pratiksha%20shinde.pdf",
    abstract:
      "Wireless Power Transfer technology offers a promising route to safer, more convenient electric-vehicle charging. This study examines inductive coupling, coil geometry, resonance frequency, compensation topologies and practical efficiency, while considering alignment sensitivity, electromagnetic exposure and interoperability.",
  },
  {
    paperId: "IJITMES-00068",
    title: "An In-Depth Evaluation of Fluoride Contamination and Advanced Adsorptive Treatment Approaches",
    authors: ["Jayesh Bhalerao"],
    volume: "1",
    issue: "6",
    published: "10 November 2025",
    field: "Environmental Engineering",
    fileUrl: "https://ijitmes.com/admin/uploads/papers/1764479567_final%20Jayesh%20bhaleroa%20volume%201%20issue%206.pdf",
    abstract:
      "This paper evaluates fluoride sources, environmental pathways, exposure mechanisms and associated health risks, with a critical assessment of adsorption-based defluoridation methods and their potential role in sustainable mitigation strategies.",
  },
  {
    paperId: "IJITMES-00067",
    title: "Adaptive Context-Aware Wireless Network Optimization Leveraging AI Techniques",
    authors: ["Radhika Johar"],
    volume: "1",
    issue: "6",
    published: "25 October 2025",
    field: "Artificial Intelligence",
    fileUrl: "https://ijitmes.com/admin/uploads/papers/1761454660_final%20radhika%20johar%20volume%201%20issue%206.pdf",
    abstract:
      "The study discusses intelligent, context-aware optimization in wireless systems using machine learning. It considers location, device capability and changing network conditions to improve reliability, latency and end-user experience.",
  },
  {
    paperId: "IJITMES-00066",
    title: "Machine Learning Approaches for Analyzing Stock Market Behavior",
    authors: ["Shrikant Wagh"],
    volume: "1",
    issue: "5",
    published: "14 October 2025",
    field: "Data Science",
    fileUrl: "https://ijitmes.com/admin/uploads/papers/1760435984_market%20trends%20using%20ml.pdf",
    abstract:
      "A review of machine-learning methods used to study and forecast market trends, including regression, decision trees, support-vector machines, neural networks and LSTM models, with attention to model selection, feature engineering and validation.",
  },
  {
    paperId: "IJITMES-00065",
    title: "VLSI Design Trends in Low-Power Circuits",
    authors: ["Sushmita V. Patil"],
    volume: "1",
    issue: "5",
    published: "7 October 2025",
    field: "Electronics",
    fileUrl: "https://ijitmes.com/admin/uploads/papers/1759838005_VLSI%20PAPER.docx",
    abstract:
      "An overview of low-power VLSI design at device, circuit, architecture and system levels, covering voltage scaling, clock and power gating, multi-threshold CMOS, DVFS, FinFET, approximate computing and AI-assisted optimization.",
  },
  {
    paperId: "IJITMES-00064",
    title: "Enhancing Thermal Comfort in Lightweight Buildings with Phase Change Materials",
    authors: ["Janvi S. M."],
    volume: "1",
    issue: "5",
    published: "28 September 2025",
    field: "Civil Engineering",
    fileUrl: "https://ijitmes.com/admin/uploads/papers/1759033716_Final%20Enhancing%20Thermal%20Comfort%20in%20Lightweight.pdf",
    abstract:
      "This simulation-based study investigates phase-change materials as a passive solution to overheating in lightweight building envelopes, testing integration methods, melting temperatures, thicknesses and thermal-storage capacity.",
  },
];

export const issues = [
  { volume: 1, issue: 7, period: "2025", label: "Volume 1 · Issue 7", paperCount: 1 },
  { volume: 1, issue: 6, period: "2025", label: "Volume 1 · Issue 6", paperCount: 2 },
  { volume: 1, issue: 5, period: "2025", label: "Volume 1 · Issue 5", paperCount: 3 },
  { volume: 1, issue: 4, period: "August 2025", label: "Volume 1 · Issue 4", paperCount: 0 },
  { volume: 1, issue: 3, period: "July 2025", label: "Volume 1 · Issue 3", paperCount: 0 },
  { volume: 1, issue: 2, period: "June 2025", label: "Volume 1 · Issue 2", paperCount: 0 },
  { volume: 1, issue: 1, period: "May 2025", label: "Volume 1 · Issue 1", paperCount: 0 },
];

export const focusAreas = [
  "Computer science, AI & data systems",
  "Electrical, electronics & communication",
  "Civil & environmental engineering",
  "Mechanical & industrial engineering",
  "Materials science & nanotechnology",
  "Applied mathematics & computational methods",
  "Sustainable technology & energy systems",
  "Interdisciplinary science & engineering",
];

export const publicationSteps = [
  {
    number: "01",
    title: "Prepare",
    text: "Use the IJITMES manuscript template and confirm that the work meets the journal’s scope and ethical requirements.",
  },
  {
    number: "02",
    title: "Submit",
    text: "Complete the online form, include accurate author information, and upload the manuscript in DOCX format.",
  },
  {
    number: "03",
    title: "Review",
    text: "The editorial office screens the manuscript before eligible papers proceed to independent double-blind review.",
  },
  {
    number: "04",
    title: "Decision",
    text: "Authors receive an editorial decision and, where required, respond to reviewer comments with a revised manuscript.",
  },
  {
    number: "05",
    title: "Publish",
    text: "Accepted papers are prepared for open-access publication after proof approval and completion of formalities.",
  },
];

export const board = [
  {
    role: "Editor-in-Chief",
    name: "Prof. Akash Jadhav",
    department: "Head, Department of Civil Engineering",
    institution: "Shatabdi Institute of Engineering and Research, Nashik, India",
    email: "hodcivil@siernashik.org.in",
    photo: "/images/people/akash-jadhav.png",
  },
  {
    role: "Associate Editor",
    name: "Prof. Sulekha Shardul",
    department: "Professor, Computer Engineering",
    institution: "Shatabdi Institute of Engineering and Research, Nashik, India",
    email: "Sulekhashardul@sier.org.in",
    photo: "/images/people/sulekha-shardul.png",
  },
  {
    role: "Managing Editor",
    name: "Prof. Pratiksha More",
    department: "Professor, Electronics & Telecommunication",
    institution: "Shatabdi Institute of Engineering and Research, Nashik, India",
    email: "pratikshamore@sier.org.in",
    photo: "/images/people/pratiksha-more.png",
  },
  {
    role: "Reviewer",
    name: "Prof. Swati Hinge",
    department: "Head, Department of AI & Machine Learning",
    institution: "Sanghavi College of Engineering, Nashik, India",
    email: "swati.hinge@shreemahavir.org",
    photo: "/images/people/swati-hinge.png",
  },
  {
    role: "Reviewer",
    name: "Mr. Egor V. Shikhova",
    department: "Mechanical & Automation Department",
    institution: "Novosibirsk Technical University, Russia",
    email: "egorshikhaova@utuniversity.org",
    photo: "/images/people/egor-shikhova.png",
  },
  {
    role: "Reviewer",
    name: "Prof. Chanchal Jadhav",
    department: "Professor, Electrical Engineering",
    institution: "Sanjivani College of Engineering, Kopargaon, India",
    email: "jadhavchanchalelct@sanjivani.org.in",
    photo: "/images/people/chanchal-jadhav.png",
  },
  {
    role: "Reviewer",
    name: "Prof. Nikhil Deore",
    department: "Professor, Civil & Environmental Engineering",
    institution: "MET Bhujbal Knowledge City Institute of Technology, Nashik, India",
    email: "nikhild_iot@bkc.met.edu",
    photo: "/images/people/nikhil-deore.png",
  },
  {
    role: "Reviewer",
    name: "Prof. Tejaswini Daware",
    department: "Professor, Applied Science",
    institution: "Shatabdi Institute of Technology, Nashik, India",
    email: "tejaswinidaware@sier.org.in",
    photo: "/images/people/tejaswini-daware.png",
  },
  {
    role: "Reviewer",
    name: "Prof. Kajal Singh",
    department: "Professor, Applied Science",
    institution: "Royal Institute of Management, Bhutan",
    email: "KajalSingh@riminfo.institute",
    photo: "/images/people/kajal-singh.jpg",
  },
];

export const aboutSlides = [
  { src: "/images/stock/building.jpg", caption: "Where research is carried out", alt: "Modern university building with stairways and greenery" },
  { src: "/images/stock/research.jpg", caption: "Researchers behind the papers", alt: "Researcher taking notes in a laboratory" },
  { src: "/images/stock/analysis.jpg", caption: "Careful, evidence-based evaluation", alt: "Scientist analyzing samples in a laboratory" },
];

export const homeCollage = [
  { src: "/images/stock/campus.jpg", caption: "Engineering", alt: "University campus building" },
  { src: "/images/stock/lab.jpg", caption: "Applied science", alt: "Scientist using a microscope" },
  { src: "/images/stock/data.jpg", caption: "Innovation", alt: "Researcher reviewing data on a screen" },
];

export const externalDocuments = {
  template: "https://ijitmes.com/docs/IJITMES%20paper%20format%20Template%20final.docx",
  copyright: "https://ijitmes.com/docs/Copy%20right%20form%20IJITMES%20updated%20logo%201.pdf",
};
