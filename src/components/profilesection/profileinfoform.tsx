// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import UploadButton from "./imageuploadbutton";
// import { saveProfile } from "@/app/api/profile/profiledetails";
// import { Button } from "../ui/button";

// export default function ProfileInfoForm() {
//   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
//   const [coverUrl, setCoverUrl] = useState<string | null>(null);
//   const [username, setUsername] = useState("");
//   const [dob, setDob] = useState("");
//   const [bio, setBio] = useState("");
//   const [twitterUrl, setTwitterUrl] = useState("");
//   const [youtubeUrl, setYoutubeUrl] = useState("");
//   const [instagramUrl, setInstagramUrl] = useState("");
//   const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
//     null,
//   );
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const router = useRouter();
//   const token = localStorage.getItem("authToken");
//   console.log("token  from from dta", token);
//   if (!token) {
//     // If no token is found, redirect to login page
//     router.push("/login");
//     return;
//   }

//   const checkUsernameAvailability = async (username: string) => {
//     if (!username) return;

//     try {
//       const response = await fetch("/api/profile/check-username", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username }),
//       });

//       if (response.ok) {
//         setUsernameAvailable(true);
//       } else {
//         setUsernameAvailable(false);
//         const data = await response.json();
//         setErrors((prev) => ({ ...prev, username: data.message }));
//       }
//     } catch (error) {
//       console.error("Error checking username:", error);
//     }
//   };

//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setUsername(value);
//     checkUsernameAvailability(value);
//   };

//   // const validateForm = () => {
//   //   const newErrors: { [key: string]: string } = {};

//   //   if (!username) newErrors.username = "Username is required";
//   //   if (!dob) newErrors.dob = "Date of Birth is required";
//   //   if (!bio) newErrors.bio = "Bio is required";

//   //   setErrors(newErrors);
//   //   return Object.keys(newErrors).length === 0;
//   // };

//   async function handeleProfile(formData: FormData) {
//     const token = localStorage.getItem("authToken");
//     console.log("token  from from dta", token);
//     if (!token) {
//       // If no token is found, redirect to login page
//       router.push("/login");
//       return;
//     }
//     console.log("token", token);
//     console.log("formdata", formData);
//     const result = await saveProfile(formData, token);
//     console.log(result);
//     if (result === true) {
//       router.push("/bankdetails"); // Update path here
//     }
//   }

//   return (
//     <form
//       action={handeleProfile}
//       className="flex flex-col max-w-4xl mx-auto mt-10 space-y-6"
//     >
//       {/* Cover Image */}
//       <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
//         {coverUrl && (
//           <img
//             src={coverUrl}
//             alt="Cover"
//             className="object-cover w-full h-full"
//           />
//         )}
//         <div className="absolute top-4 right-4">
//           <UploadButton onUplodeComplete={setCoverUrl} />
//           <input type="hidden" name="coverurl" value={coverUrl || ""} />
//         </div>
//       </div>

//       {/* Avatar Image */}
//       <div className="relative -mt-16 flex justify-center">
//         <div className="relative">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
//             {avatarUrl ? (
//               <img
//                 src={avatarUrl}
//                 alt="Avatar"
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-200">check</div>
//             )}
//           </div>
//           <div className="absolute bottom-0 right-0">
//             <UploadButton onUplodeComplete={setAvatarUrl} />
//             <input type="hidden" name="avtarurl" value={avatarUrl || ""} />
//           </div>
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-6 p-4 border-2 border-black rounded-lg">
//         {/* Username */}
//         <div className="p-4">
//           <label
//             htmlFor="username"
//             className="block text-sm font-semibold mb-1"
//           >
//             Username
//           </label>
//           <input
//             name="username"
//             type="text"
//             value={username}
//             onChange={handleUsernameChange}
//             placeholder="Enter a username"
//             className="border-2 border-black p-2 w-full rounded-lg"
//           />
//           {usernameAvailable === true && (
//             <p className="text-green-600 mt-1">Username available</p>
//           )}
//           {usernameAvailable === false && (
//             <p className="text-red-600 mt-1">Username already taken</p>
//           )}
//           {errors.username && (
//             <p className="text-red-600 mt-1">{errors.username}</p>
//           )}
//         </div>

//         {/* Date of Birth */}
//         <div className="p-4">
//           <label htmlFor="dob" className="block text-sm font-semibold mb-1">
//             Date of Birth
//           </label>
//           <input
//             name="dob"
//             type="date"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//             className="border-2 border-black p-2 w-full rounded-lg"
//           />
//           {errors.dob && <p className="text-red-600 mt-1">{errors.dob}</p>}
//         </div>

//         {/* Bio */}
//         <div className="p-4">
//           <label htmlFor="bio" className="block text-sm font-semibold mb-1">
//             Bio
//           </label>
//           <textarea
//             name="bio"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             placeholder="Write a short bio"
//             className="border-2 border-black p-2 w-full h-20 rounded-lg"
//           >
//             {" "}
//           </textarea>
//           {errors.bio && <p className="text-red-600 mt-1">{errors.bio}</p>}
//         </div>

//         {/* Social Links */}
//         {["twitterUrl", "youtubeUrl", "instagramUrl"].map((social, index) => (
//           <div key={index} className="p-4">
//             <label
//               htmlFor={social}
//               className="block text-sm font-semibold mb-1"
//             >
//               {social.charAt(0).toUpperCase() + social.slice(1, -3)} Link
//             </label>
//             <input
//               name={social}
//               type="text"
//               value={
//                 social === "twitterUrl"
//                   ? twitterUrl
//                   : social === "youtubeUrl"
//                     ? youtubeUrl
//                     : instagramUrl
//               }
//               onChange={(e) => {
//                 const value = e.target.value;
//                 social = "twitterUrl"
//                   ? setTwitterUrl(value)
//                   : social === "youtubeUrl"
//                   ? setYoutubeUrl(value)
//                   : setInstagramUrl(value);
//               }}
//               placeholder={`Your ${social.charAt(0).toUpperCase() + social.slice(1, -3)} profile link`}
//               className="border-2 border-black p-2 w-full rounded-lg"
//             />
//           </div>
//         ))}

//         {/* Submit Button */}
//         <div className="p-4 flex justify-center">
//           <Button className="px-6 py-2 bg-yellow-400 rounded-xl border-2 border-black hover:bg-yellow-500">
//             NEXT
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }
