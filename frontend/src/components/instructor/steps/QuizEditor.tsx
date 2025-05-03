import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Quiz, QuizQuestion, QuestionType } from '@/types/course';
import { v4 as uuidv4 } from 'uuid';
import { quizService } from '@/services/quizService';
import { toast } from 'sonner';

interface QuizEditorProps {
  courseId: string;
  sectionId: string;
  quiz?: Quiz;
  onSave: (quiz: Quiz) => void;
  onCancel: () => void;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({ courseId, sectionId, quiz, onSave, onCancel }) => {
  const [editedQuiz, setEditedQuiz] = useState<Quiz>(quiz || {
    id: uuidv4(),
    title: '',
    description: '',
    passingScore: 70,
    questions: []
  });

  const [newQuestion, setNewQuestion] = useState<Partial<QuizQuestion>>({
    type: QuestionType.MULTIPLE_CHOICE,
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleAddQuestion = () => {
    if (!newQuestion.text) return;

    const question: QuizQuestion = {
      id: uuidv4(),
      text: newQuestion.text,
      type: newQuestion.type || QuestionType.MULTIPLE_CHOICE,
      options: newQuestion.type === QuestionType.TRUE_FALSE ? ['True', 'False'] : newQuestion.options || ['', '', '', ''],
      correctAnswer: newQuestion.correctAnswer || 0,
      explanation: newQuestion.explanation
    };

    setEditedQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, question]
    }));

    setNewQuestion({
      type: QuestionType.MULTIPLE_CHOICE,
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const handleUpdateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setEditedQuiz(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleDeleteQuestion = (index: number) => {
    setEditedQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const questions = Array.from(editedQuiz.questions);
    const [reorderedQuestion] = questions.splice(result.source.index, 1);
    questions.splice(result.destination.index, 0, reorderedQuestion);

    setEditedQuiz(prev => ({ ...prev, questions }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const savedQuiz = await quizService.updateQuiz(courseId, sectionId, editedQuiz);
      onSave(savedQuiz);
      toast.success('Quiz saved successfully');
    } catch (error) {
      toast.error('Failed to save quiz');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Quiz Title</Label>
          <Input
            id="title"
            value={editedQuiz.title}
            onChange={(e) => setEditedQuiz(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter quiz title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={editedQuiz.description}
            onChange={(e) => setEditedQuiz(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter quiz description"
          />
        </div>

        <div>
          <Label htmlFor="passingScore">Passing Score (%)</Label>
          <Input
            id="passingScore"
            type="number"
            min="0"
            max="100"
            value={editedQuiz.passingScore}
            onChange={(e) => setEditedQuiz(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Questions</h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {editedQuiz.questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4 mb-4"
                      >
                        <div className="flex items-start gap-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="w-5 h-5 text-gray-400" />
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <div>
                              <Label>Question Text</Label>
                              <Input
                                value={question.text}
                                onChange={(e) => handleUpdateQuestion(index, 'text', e.target.value)}
                              />
                            </div>

                            {question.type === QuestionType.MULTIPLE_CHOICE && (
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center gap-2">
                                    <RadioGroup
                                      value={question.correctAnswer.toString()}
                                      onValueChange={(value) => handleUpdateQuestion(index, 'correctAnswer', parseInt(value))}
                                    >
                                      <RadioGroupItem value={optionIndex.toString()} id={`option-${optionIndex}`} />
                                    </RadioGroup>
                                    <Input
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options];
                                        newOptions[optionIndex] = e.target.value;
                                        handleUpdateQuestion(index, 'options', newOptions);
                                      }}
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        const newOptions = question.options.filter((_, i) => i !== optionIndex);
                                        handleUpdateQuestion(index, 'options', newOptions);
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newOptions = [...question.options, ''];
                                    handleUpdateQuestion(index, 'options', newOptions);
                                  }}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Option
                                </Button>
                              </div>
                            )}

                            {question.type === QuestionType.TRUE_FALSE && (
                              <RadioGroup
                                value={question.correctAnswer.toString()}
                                onValueChange={(value) => handleUpdateQuestion(index, 'correctAnswer', parseInt(value))}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="0" id="true" />
                                  <Label htmlFor="true">True</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="1" id="false" />
                                  <Label htmlFor="false">False</Label>
                                </div>
                              </RadioGroup>
                            )}

                            <div>
                              <Label>Explanation (Optional)</Label>
                              <Textarea
                                value={question.explanation || ''}
                                onChange={(e) => handleUpdateQuestion(index, 'explanation', e.target.value)}
                                placeholder="Explain why this is the correct answer"
                              />
                            </div>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteQuestion(index)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Question
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Card className="p-4">
          <h4 className="text-md font-semibold mb-4">Add New Question</h4>
          <div className="space-y-4">
            <div>
              <Label>Question Type</Label>
              <Select
                value={newQuestion.type}
                onValueChange={(value) => setNewQuestion(prev => ({ ...prev, type: value as QuestionType }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</SelectItem>
                  <SelectItem value={QuestionType.TRUE_FALSE}>True/False</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Question Text</Label>
              <Input
                value={newQuestion.text || ''}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Enter your question"
              />
            </div>

            {newQuestion.type === QuestionType.MULTIPLE_CHOICE && (
              <div className="space-y-2">
                {newQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <RadioGroup
                      value={newQuestion.correctAnswer?.toString()}
                      onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: parseInt(value) }))}
                    >
                      <RadioGroupItem value={index.toString()} id={`new-option-${index}`} />
                    </RadioGroup>
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(newQuestion.options || [])];
                        newOptions[index] = e.target.value;
                        setNewQuestion(prev => ({ ...prev, options: newOptions }));
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {newQuestion.type === QuestionType.TRUE_FALSE && (
              <RadioGroup
                value={newQuestion.correctAnswer?.toString()}
                onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: parseInt(value) }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="new-true" />
                  <Label htmlFor="new-true">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="new-false" />
                  <Label htmlFor="new-false">False</Label>
                </div>
              </RadioGroup>
            )}

            <div>
              <Label>Explanation (Optional)</Label>
              <Textarea
                value={newQuestion.explanation || ''}
                onChange={(e) => setNewQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                placeholder="Explain why this is the correct answer"
              />
            </div>

            <Button onClick={handleAddQuestion} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Quiz'}
        </Button>
      </div>
    </div>
  );
}; 