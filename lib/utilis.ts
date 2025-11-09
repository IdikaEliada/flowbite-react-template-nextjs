import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { departments } from "@/lib/data/departments";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleDepartments(faculty: string) {
  switch (faculty) {
    case "School of Engineering & Engineering Technology":
      return [
        "Petroleum Engineering",
        "Materials & Metallurgical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Chemical Engineering",
        "Food Science & Technology",
        "Polymer & Textile Engineering",
        "Biomedical Engineering",
        "Agricultural and Bioresources Engineering",
      ];
    case "School of Physical Sciences":
      return [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Statistics",
        "Science Laboratory Technology",
      ];
    case "School of Biological Sciences":
      return [
        "Biochemistry",
        "Microbiology",
        "Biotechnology",
        "Biology",
        "Forensic Science",
      ];
    case "School of Agriculture & Agricultural Technology":
      return [
        "Crop Science Technology",
        "Agricultural Economics",
        "Agricultural Extension",
        "Animal Science and Technology",
        "Crop Science and Technology",
        "Fisheries and Aquaculture Technology",
        "Forestry and Wildlife Technology",
        "Soil Science and Technology",
      ];
    case "School of Information & Communication Technology":
      return [
        "Computer Science",
        "Software Engineering",
        "Cyber Security",
        "Information Technology",
      ];
    case "School of Environmental Sciences":
      return [
        "Architecture",
        "Building Technology",
        "Environmental Management",
        "Quantity Surveying",
        "Surveying and Geoinformatics",
        "Urban and Regional Planning",
        "Estate Management and Evaluation",
      ];
    case "School of Logistics & Innovation Technology":
      return [
        "Estate Management & Valuate",
        "Logistics & Transport Technology",
        "Entrepreneurship & Innovation S",
        "Maritime Technology and Logistics",
        "Supply Chain Management",
        "Project Management Technology",
      ];
    case "School of Health Technology":
      return [
        "Prosthetics and Orthotics",
        "Environmental Health Science",
        "Optometry",
        "Public Health Technology",
        "Dental Technology",
        "Radiography",
      ];
    case "School of Electrical Systems & Engineering Technology":
      return [
        "Mechatronics Engineering",
        "Computer Engineering",
        "Electronics Engineering",
        "Telecommunications Engineering",
        "Electrical (Power Systems) Engineering",
      ];
    case "School of Basic Medical Sciences":
      return ["Human Anatomy", "Human Physiology"];
    case "College of Medicine":
      return ["Medicine and Surgery (MBBS)"];
    case "Ce-Sustainable Procurement, Environmental & Social Standards":
      return [
        "Sustainable Social Development",
        "Sustainable Environmental Studies",
        "Procurement Management",
      ];
    default:
      return [...departments];
  }
}

// client-side upload helper (browser)
{
  /*export async function uploadToCloudinaryUnsigned(file: File) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // you can expose cloud name
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Cloudinary requires the cloud name in the URL
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error('Cloudinary upload failed: ' + errText);
  }
  const data = await res.json();
  // data.secure_url is the uploaded image URL
  return data;
}*/
}
