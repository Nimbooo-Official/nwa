"use server";
import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import Image from "next/image";
import ShareModal from "@/components/creatorsection/shearpage";
import { dbConnect } from "@/lib/dbConnect";
import Navigation from "@/components/creatorsection/navbar";
import { Footer } from "@/app/(website)/Footer";
import User from "@/models/User";
import MenuForCreator from "@/components/creatorsection/menufrocreator";

export default async function Dashboard() {
  await dbConnect();
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  let decoded: JwtPayload | string;
  let userId: string;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof decoded === "string") throw new Error("Invalid token format");
    userId = decoded.id as string;
  } catch {
    return redirect("/login");
  }

  const user = await User.findById(userId).exec();
  if (!user) return redirect("/login");
  console.log('dashboard',user.virtualAccountId)

  const avatarUrl =
    user.avtarurl || "https://api.dicebear.com/9.x/pixel-art/svg";

  return (
    <>
      <div className="md:flex bg-background">
        <Navigation username={user.username} />
        <main className="flex-1 p-6">
          <div className="flex justify-end px-4">
            <MenuForCreator userId={user.userId} />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6">
              <div className="size-32 overflow-hidden rounded-full border-4 border-white bg-slate-300">
                <Image
                  src={avatarUrl}
                  width={246}
                  height={246}
                  alt="avatar image"
                  className="size-32 object-cover object-center bg-slate-400"
                />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-primary font-bold">
                  Hi, {user.firstName} {user.lastName}
                </h2>
                <ShareModal shareUrl={user.username} />
              </div>
              <p className="text-gray-500">
                nimboo.com/<span className="text-primary">{user.username}</span>
              </p>
            </div>
            {/* Earnings Section */}
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Earnings</h3>
                <select className="border px-3 py-1">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                </select>
              </div>
              <h4 className="text-4xl font-bold">$0</h4>
              <div className="flex space-x-4 mt-2">
                <span className="text-gray-500">$0 Supporters</span>
                <span className="text-gray-500">$0 Membership</span>
                <span className="text-gray-500">$0 Shop</span>
              </div>
            </div>
            {/* Supporters Section */}
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 text-center">
              <p className="text-gray-500">You don’t have any supporters yet</p>
              <p className="text-gray-500">
                Share your page with your audience to get started.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
