import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CourseDraft, ContentType, Section, Quiz } from '@/types/course';
import { CourseBasicInfo } from './steps/CourseBasicInfo';
import { CourseSections } from './steps/CourseSections';
import { CoursePricing } from './steps/CoursePricing';
import { CoursePreview } from './steps/CoursePreview';
import { useCourseStore } from '@/stores/courseStore';

const INITIAL_DRAFT: CourseDraft = {
  title: '',
  description: '',
  thumbnail: '',
  instructorId: '', // Will be set from auth context
  sections: [],
  price: 0,
  isPublished: false,
  category: '',
  tags: [],
  level: 'BEGINNER',
  totalDuration: 0,
  totalXp: 0
};

const STEPS = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Set your course title, description, and category'
  },
  {
    id: 'sections',
    title: 'Course Content',
    description: 'Add and organize your course sections'
  },
  {
    id: 'pricing',
    title: 'Pricing & Publishing',
    description: 'Set your course price and publishing options'
  },
  {
    id: 'preview',
    title: 'Preview & Publish',
    description: 'Review your course and publish when ready'
  }
];

export const CourseCreationWizard: React.FC = () => {
  const navigate = useNavigate();
  const { createCourse, updateCourse } = useCourseStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [draft, setDraft] = useState<CourseDraft>(INITIAL_DRAFT);
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      if (draft.id) {
        await updateCourse(draft.id, draft);
      } else {
        const newCourse = await createCourse(draft);
        setDraft({ ...draft, id: newCourse.id });
      }
      toast.success('Draft saved successfully');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsSaving(true);
      const courseToPublish = { ...draft, isPublished: true };
      if (draft.id) {
        await updateCourse(draft.id, courseToPublish);
      } else {
        await createCourse(courseToPublish);
      }
      toast.success('Course published successfully');
      navigate('/instructor/courses');
    } catch (error) {
      toast.error('Failed to publish course');
    } finally {
      setIsSaving(false);
    }
  };

  const updateDraft = (updates: Partial<CourseDraft>) => {
    setDraft(prev => ({ ...prev, ...updates }));
  };

  const addSection = (section: Section) => {
    setDraft(prev => ({
      ...prev,
      sections: [...prev.sections, section]
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setDraft(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    setDraft(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const reorderSections = (startIndex: number, endIndex: number) => {
    setDraft(prev => {
      const sections = [...prev.sections];
      const [removed] = sections.splice(startIndex, 1);
      sections.splice(endIndex, 0, removed);
      return { ...prev, sections };
    });
  };

  const addQuiz = (sectionId: string, quiz: Quiz) => {
    setDraft(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? {
              ...section,
              contentType: ContentType.QUIZ,
              content: { ...section.content, quiz }
            }
          : section
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="mb-6" />
          
          <Tabs value={STEPS[currentStep].id} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              {STEPS.map((step, index) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  disabled={index > currentStep}
                >
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="basic-info">
              <CourseBasicInfo
                draft={draft}
                onUpdate={updateDraft}
                onNext={handleNext}
              />
            </TabsContent>

            <TabsContent value="sections">
              <CourseSections
                sections={draft.sections}
                onAddSection={addSection}
                onUpdateSection={updateSection}
                onDeleteSection={deleteSection}
                onReorderSections={reorderSections}
                onAddQuiz={addQuiz}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>

            <TabsContent value="pricing">
              <CoursePricing
                draft={draft}
                onUpdate={updateDraft}
                onNext={handleNext}
                onBack={handleBack}
              />
            </TabsContent>

            <TabsContent value="preview">
              <CoursePreview
                course={draft}
                onPublish={handlePublish}
                onBack={handleBack}
                isSaving={isSaving}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              Save as Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 