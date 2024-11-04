import React from "react";

const stats = [
  { id: 1, name: "Creators on the platform", value: "100+" },
  { id: 2, name: "Flat platform fee", value: "8%" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Paid out to creators", value: "100k" },
];

export const Stats = () => {
  return (
    <section className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2
              className="text-primary text-balance text-4xl font-semibold tracking-tight text-gray-900
                sm:text-5xl"
            >
              Trusted by creators and publishers
            </h2>
            <p className="mt-4 text-lg/8 text-gray-500">
              Rated most Reliable and Convenient solution for accepting Payments
            </p>
          </div>
          <dl
            className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center
              sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-6">
                <dt className="text-sm/6 font-semibold text-gray-500">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-primary">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
