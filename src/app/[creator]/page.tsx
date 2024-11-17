"use server";

import DonationForm from "@/components/creatorsection/DonationForm";
import User from "@/models/User";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { dbConnect } from "@/lib/dbConnect";

type Props = {
  params: {
    creator: string;
  };
};

interface Donator {
  name: string;
  avatar?: string; // optional field if avatar can be undefined
}

export default async function profilepage({ params }: Props) {
  const username = params.creator;
  console.log(username)

  await dbConnect()

  // Fetching user profile information from the database
  const profileinfo = await User.findOne({ username });

  // If profile info not found, return a 404 message
  if (!profileinfo) {
    return (
      <div className="m-32 flex justify-center items-center text-9xl">
        404 not found
      </div>
    );
  }

  // Fallback URL for avatar if not provided
  const avatarUrl = profileinfo.avtarurl || `https://robohash.org/default-avatar?size=200x200`;
  const coverurl = profileinfo.coverurl || `https://robohash.org/default-avatar?size=200x200`;
  console.log(profileinfo.virtualAccountId)

  return (
    <div className="mt-10 mb-96">
      <div className="w-full h-48 bg-slate-400">
        <Image
          src={avatarUrl}
          width={246}
          height={246}
          alt="cover image"
          className="object-cover object-center h-48 bg-slate-400 w-full"
        />
      </div>

      <div className="max-w-2xl mx-auto relative -mt-24">
        <div className="flex items-end gap-4">
          <div className="w-48 h-48 overflow-hidden rounded-full border-4 border-white">
            <Image
              src={coverurl}
              width={246}
              height={246}
              alt={`Avatar of ${profileinfo.FirstName} ${profileinfo.LastName}`}
              className="w-48 h-48 object-cover object-center bg-slate-400 rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profileinfo.firstName} {profileinfo.lastName}</h1>
            <h2 className="text-gray-500">nimbooda.io/{profileinfo.username}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
          <div>
            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg text-primary mb-4">About {profileinfo.FirstName}</h3>
              <div className="flex gap-6 mb-4">
                <Link href={"https://instagram.com"}>
                  <span className="bg-white rounded-lg shadow-md hover:bg-gray-300">
                    <FontAwesomeIcon icon={faInstagram} className="text-pink-600 w-6 h-6" />
                  </span>
                </Link>
                <Link href={"https://facebook.com"}>
                  <span className="bg-white  rounded-lg shadow-md hover:bg-gray-50">
                    <FontAwesomeIcon icon={faFacebook} className="text-blue-600 w-6 h-6" />
                  </span>
                </Link>
                <Link href={"https://twitter.com"}>
                  <span className="bg-white  rounded-lg shadow-md hover:bg-gray-50">
                    <FontAwesomeIcon icon={faTwitter} className="text-blue-400 w-6 h-6" />
                  </span>
                </Link>
                <Link href={"https://linkedin.com"}>
                  <span className="bg-white  rounded-lg shadow-md hover:bg-gray-50">
                    <FontAwesomeIcon icon={faLinkedin} className="text-blue-700 w-6 h-6" />
                  </span>
                </Link>
              </div>

              <div className="bg-background p-4 rounded-lg shadow-inner h-40 overflow-hidden text-ellipsis">
                <p className="whitespace-normal break-words text-secondary-foreground text-sm">{profileinfo.bio}</p>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-gray-900 rounded-xl p-6 shadow-md mt-10">
              <h2 className="font-semibold text-lg text-center mb-4">Supporters</h2>

              {profileinfo.donations.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-36 bg-white rounded-lg shadow-inner">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-500">No supporters</p>
                </div>
              ) : (
                <div className="space-y-4 mt-4">
                  {profileinfo.donations.map((donator: Donator) => (
                    <div key={donator.name} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
                      <Image
                        src={donator.avatar || "https://robohash.org/default-avatar?size=100x100"}
                        alt={donator.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium">{donator.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-gray-900 rounded-xl p-6 shadow-md">
          <DonationForm userId={profileinfo.id} virtual={profileinfo.virtualAccountId} />

          </div>
        </div>
      </div>
    </div>
  );
}
