export const faculties = [
  "School of Engineering & Engineering Technology",
  "School of Physical Sciences",
  "School of Biological Sciences",
  "School of Agriculture & Agricultural Technology",
  "School of Information & Communication Technology",
  "School of Environmental Sciences",
  "School of Logistics & Innovation Technology",
  "School of Health Technology",
  "School of Electrical Systems & Engineering Technology",
  "School of Basic Medical Sciences",
  "College of Medicine",
  "Ce-Sustainable Procurement, Environmental & Social Standards",
] as const;

export type Faculty = (typeof faculties)[number];
