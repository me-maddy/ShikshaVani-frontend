import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Subject } from "../../types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Separator } from "../ui/separator";
import FeedbackCardForFaculty from "./FeedbackCardForFaculty";

interface SubjectSectionProps {
  subject: Subject;
}

const SubjectSection: React.FC<SubjectSectionProps> = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="mb-6">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-purple-50 rounded-md transition-all duration-200"
      >
        <CollapsibleTrigger className="w-full text-left cursor-pointer rounded bg-white mb-6">
          <div className="flex items-center justify-between py-1.5 px-2">
            <h3 className="text-xl font-semibold text-gray-700">
              {subject.subjectName}
            </h3>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-purple-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 text-purple-500 transition-transform duration-200" />
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="animate-accordion-down">
          {subject.feedbacks.length === 0 ? (
            <p className="text-gray-500 pl-2">
              No feedbacks available for this subject.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 pb-4">
              {subject.feedbacks.map((feedback) => (
                <FeedbackCardForFaculty key={feedback.id} feedback={feedback} />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      <Separator className="my-4 bg-faculty-softGray" />
    </section>
  );
};

export default SubjectSection;
