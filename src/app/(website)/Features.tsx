import { CloudUpload, Lock, RefreshCw, Fingerprint } from "lucide-react";

const features = [
  {
    name: "Push to deploy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: CloudUpload,
  },
  {
    name: "SSL certificates",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: Lock,
  },
  {
    name: "Simple queues",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: RefreshCw,
  },
  {
    name: "Advanced security",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: Fingerprint,
  },
];

export const Features = () => {
  return (
    <div className="py-14 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-black">
            Monetise faster
          </h2>
          <p
            className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-primary sm:text-5xl
              lg:text-balance"
          >
            Everything you need to generate payment links
          </p>
          <div className="mt-6 text-lg/8 text-gray-500">
            Signup Onboarding <i>to</i> creating your public profile and
            showcase <i>to</i> adding your bank account <i>to</i> genrating
            payment links.
            <p className="font-[family-name:var(--font-poppins)]">
              <b>All in less than 15 minutes</b>
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2
              lg:gap-y-16"
          >
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-primary">
                  <div
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg
                      bg-primary"
                  >
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
