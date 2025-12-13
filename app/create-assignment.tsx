/**
 * Create Assignment Screen
 * 
 * Form for creating new assignments with:
 * - Assignment Title
 * - Subject Selection (Dropdown)
 * - Due Date & Time Picker
 * - Total Marks
 * - Description (Multi-line)
 * - File/Image Upload
 * - Submit Button
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CreateAssignmentScreen() {
  const [title, setTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState('11:59 PM');
  const [totalMarks, setTotalMarks] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Mock data - replace with real data
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Computer Science',
    'History',
    'Geography',
  ];

  const times = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:59 PM',
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleUploadFile = () => {
    Alert.alert(
      'Upload Attachment',
      'Choose file type to upload',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Document',
          onPress: () => {
            // Simulate file upload
            setAttachments([...attachments, 'Assignment_Guidelines.pdf']);
            Alert.alert('Success', 'Document uploaded successfully!');
          },
        },
        {
          text: 'Image',
          onPress: () => {
            // Simulate image upload
            setAttachments([...attachments, 'Reference_Image.jpg']);
            Alert.alert('Success', 'Image uploaded successfully!');
          },
        },
      ]
    );
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter assignment title');
      return false;
    }
    if (!selectedSubject) {
      Alert.alert('Validation Error', 'Please select a subject');
      return false;
    }
    if (!totalMarks.trim()) {
      Alert.alert('Validation Error', 'Please enter total marks');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter assignment description');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    Alert.alert(
      'Assign to Class',
      'Select class to assign this assignment',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Grade 10A',
          onPress: () => {
            Alert.alert('Success', 'Assignment created and assigned to Grade 10A!');
            // Reset form
            setTitle('');
            setSelectedSubject('');
            setDueDate(new Date());
            setDueTime('11:59 PM');
            setTotalMarks('');
            setDescription('');
            setAttachments([]);
          },
        },
        {
          text: 'Grade 10B',
          onPress: () => {
            Alert.alert('Success', 'Assignment created and assigned to Grade 10B!');
          },
        },
      ]
    );
  };

  const PickerModal = ({
    visible,
    onClose,
    title,
    options,
    selectedValue,
    onSelect,
  }: {
    visible: boolean;
    onClose: () => void;
    title: string;
    options: string[];
    selectedValue: string;
    onSelect: (value: string) => void;
  }) => (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={styles.modalScroll}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  selectedValue === option && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedValue === option && styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {selectedValue === option && (
                  <IconSymbol name="checkmark" size={20} color={AppColors.primary.main} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const DatePickerModal = () => {
    const dates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });

    return (
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDatePicker(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Due Date</Text>
            <ScrollView style={styles.modalScroll}>
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalOption,
                    date.toDateString() === dueDate.toDateString() && styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    setDueDate(date);
                    setShowDatePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      date.toDateString() === dueDate.toDateString() && styles.modalOptionTextSelected,
                    ]}
                  >
                    {formatDate(date)}
                  </Text>
                  {date.toDateString() === dueDate.toDateString() && (
                    <IconSymbol name="checkmark" size={20} color={AppColors.primary.main} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <IconSymbol name="doc.text.fill" size={32} color={AppColors.primary.main} />
          <Text style={styles.headerTitle}>Create New Assignment</Text>
          <Text style={styles.headerSubtitle}>Fill in the details below</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Assignment Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Assignment Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter assignment title"
              placeholderTextColor={AppColors.text.tertiary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Subject Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Subject <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowSubjectPicker(true)}
            >
              <Text
                style={[
                  styles.pickerButtonText,
                  !selectedSubject && styles.pickerButtonTextPlaceholder,
                ]}
              >
                {selectedSubject || 'Select subject'}
              </Text>
              <IconSymbol name="chevron.down" size={16} color={AppColors.text.secondary} />
            </TouchableOpacity>
          </View>

          {/* Due Date & Time */}
          <View style={styles.rowGroup}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                Due Date <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <IconSymbol name="calendar" size={16} color={AppColors.primary.main} />
                <Text style={styles.pickerButtonText}>
                  {formatDate(dueDate).split(',')[0]}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                Time <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowTimePicker(true)}
              >
                <IconSymbol name="clock" size={16} color={AppColors.primary.main} />
                <Text style={styles.pickerButtonText}>{dueTime}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Total Marks */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Total Marks <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter total marks (e.g., 100)"
              placeholderTextColor={AppColors.text.tertiary}
              value={totalMarks}
              onChangeText={setTotalMarks}
              keyboardType="numeric"
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter assignment description and instructions"
              placeholderTextColor={AppColors.text.tertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Attachments */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Attachments</Text>
            
            {/* Upload Button */}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadFile}
              activeOpacity={0.7}
            >
              <IconSymbol name="paperclip" size={20} color={AppColors.primary.main} />
              <Text style={styles.uploadButtonText}>Upload File/Image</Text>
            </TouchableOpacity>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <View style={styles.attachmentList}>
                {attachments.map((attachment, index) => (
                  <View key={index} style={styles.attachmentItem}>
                    <IconSymbol
                      name={attachment.endsWith('.pdf') ? 'doc.fill' : 'photo.fill'}
                      size={20}
                      color={AppColors.primary.main}
                    />
                    <Text style={styles.attachmentName}>{attachment}</Text>
                    <TouchableOpacity
                      onPress={() => removeAttachment(index)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <IconSymbol name="xmark.circle.fill" size={20} color={AppColors.status.error.main} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <IconSymbol name="checkmark.circle.fill" size={22} color={AppColors.primary.contrast} />
          <Text style={styles.submitButtonText}>Assign to Class</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <PickerModal
        visible={showSubjectPicker}
        onClose={() => setShowSubjectPicker(false)}
        title="Select Subject"
        options={subjects}
        selectedValue={selectedSubject}
        onSelect={setSelectedSubject}
      />

      <DatePickerModal />

      <PickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        title="Select Time"
        options={times}
        selectedValue={dueTime}
        onSelect={setDueTime}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },

  // Header
  header: {
    backgroundColor: AppColors.background.secondary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  headerTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: AppColors.text.primary,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
  },

  // Form
  form: {
    padding: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  rowGroup: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginBottom: Spacing.xs,
  },
  required: {
    color: AppColors.status.error.main,
  },

  // Input Styles (Using Global Input Styles)
  input: {
    backgroundColor: AppColors.ui.input.background,
    borderWidth: 1,
    borderColor: AppColors.ui.input.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
  },
  textArea: {
    minHeight: 120,
    paddingTop: Spacing.md,
  },

  // Picker Button
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.ui.input.background,
    borderWidth: 1,
    borderColor: AppColors.ui.input.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
  },
  pickerButtonText: {
    flex: 1,
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  pickerButtonTextPlaceholder: {
    color: AppColors.text.tertiary,
    fontWeight: '400',
  },

  // Upload Button
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.background.secondary,
    borderWidth: 2,
    borderColor: AppColors.primary.main,
    borderStyle: 'dashed',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  uploadButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.main,
  },

  // Attachments
  attachmentList: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    gap: Spacing.sm,
  },
  attachmentName: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: AppColors.text.primary,
    fontWeight: '500',
  },

  // Submit Button (Full-width with Global Primary Color)
  submitContainer: {
    padding: Spacing.lg,
    backgroundColor: AppColors.background.primary,
    borderTopWidth: 1,
    borderTopColor: AppColors.ui.border,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    // Shadow
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: AppColors.primary.contrast,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.ui.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.md,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  modalOptionSelected: {
    backgroundColor: AppColors.background.secondary,
  },
  modalOptionText: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  modalOptionTextSelected: {
    color: AppColors.primary.main,
    fontWeight: '700',
  },
});
