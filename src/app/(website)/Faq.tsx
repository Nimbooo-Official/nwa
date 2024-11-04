import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Faq = () => {
  return (
    <div className="">
      <div className="mx-auto max-w-5xl px-6 py-4 max-sm:py-16">
        <div className="flex flex-col justify-center items-center align-middle sm:p-4 gap-4">
          <h2 className="p-4 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Frequently asked questions
          </h2>

          <Accordion type="single" collapsible className="w-full max-w-3xl">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base/7 font-semibold text-primary">
                Is there a Free Trial ?
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-base/7 text-gray-500">
                Yes. Nimbooo will offer a generous free trial at launch.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base/7 font-semibold text-primary">
                What file types can i upload ?
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-base/7 text-gray-500">
                Currently you can only upload PDF, JPG, MP4 files. But we will
                soon allow more options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base/7 font-semibold text-primary">
                Can I access my supporters list ?
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-base/7 text-gray-500">
                Yes. It`&apos;`s accessible to you by default, but you can
                disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
