import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, GripVertical, Trash2, Video, Headphones, Book, Brain } from 'lucide-react';
import { Section, ContentType, Quiz, QuizQuestion } from '@/types/course';
import { v4 as uuidv4 } from 'uuid';
import { QuizEditor } from './QuizEditor';

interface CourseSectionsProps {
  sections: Section[];
  onAddSection: (section: Section) => void;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  onDeleteSection: (sectionId: string) => void;
  onReorderSections: (startIndex: number, endIndex: number) => void;
  onAddQuiz: (sectionId: string, quiz: Quiz) => void;
  onNext: () => void;
  onBack: () => void;
}

const CONTENT_TYPE_ICONS = {
  [ContentType.VIDEO]: Video,
  [ContentType.AUDIO]: Headphones,
  [ContentType.STORY]: Book,
  [ContentType.QUIZ]: Brain,
};

export const CourseSections: React.FC<CourseSectionsProps> = ({
  sections,
  onAddSection,
  onUpdateSection,
  onDeleteSection,
  onReorderSections,
  onAddQuiz,
  onNext,
  onBack,
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [selectedContentType, setSelectedContentType] = useState<ContentType>(ContentType.VIDEO);
  const [editingQuiz, setEditingQuiz] = useState<{ sectionId: string; quiz: Quiz } | null>(null);

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection: Section = {
      id: uuidv4(),
      title: newSectionTitle,
      contentType: selectedContentType,
      content: {},
      order: sections.length,
    };

    onAddSection(newSection);
    setNewSectionTitle('');
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorderSections(result.source.index, result.destination.index);
  };

  const handleQuizSave = (sectionId: string, quiz: Quiz) => {
    onAddQuiz(sectionId, quiz);
    setEditingQuiz(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Section Title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="flex-1"
        />
        <Select
          value={selectedContentType}
          onValueChange={(value) => setSelectedContentType(value as ContentType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ContentType.VIDEO}>Video</SelectItem>
            <SelectItem value={ContentType.AUDIO}>Audio</SelectItem>
            <SelectItem value={ContentType.STORY}>Story</SelectItem>
            <SelectItem value={ContentType.QUIZ}>Quiz</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAddSection}>
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => {
                const Icon = CONTENT_TYPE_ICONS[section.contentType];
                return (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mb-4"
                      >
                        <CardHeader className="flex flex-row items-center gap-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          <CardTitle className="flex-1">{section.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className="w-5 h-5" />}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDeleteSection(section.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {section.contentType === ContentType.QUIZ && (
                            <div className="space-y-4">
                              {section.content.quiz ? (
                                <div>
                                  <h4 className="font-medium mb-2">Quiz Details</h4>
                                  <p>Questions: {section.content.quiz.questions.length}</p>
                                  <p>Passing Score: {section.content.quiz.passingScore}%</p>
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      setEditingQuiz({
                                        sectionId: section.id,
                                        quiz: section.content.quiz,
                                      })
                                    }
                                  >
                                    Edit Quiz
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    setEditingQuiz({
                                      sectionId: section.id,
                                      quiz: {
                                        title: `${section.title} Quiz`,
                                        description: '',
                                        questions: [],
                                        passingScore: 70,
                                      },
                                    })
                                  }
                                >
                                  Create Quiz
                                </Button>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>Next</Button>
      </div>

      {editingQuiz && (
        <QuizEditor
          quiz={editingQuiz.quiz}
          onSave={(quiz) => handleQuizSave(editingQuiz.sectionId, quiz)}
          onCancel={() => setEditingQuiz(null)}
        />
      )}
    </div>
  );
}; 