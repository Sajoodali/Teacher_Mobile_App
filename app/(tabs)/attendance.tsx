/**
 * Attendance Marking Screen
 * 
 * Features:
 * - Header with Class Name and Date Picker
 * - Student List with Photos and Names
 * - Radio Buttons for Present/Absent/Late (with global status colors)
 * - Bulk Action: Mark All Present
 * - Floating Action Button: QR Code Scanner
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type AttendanceStatus = 'present' | 'absent' | 'late' | null;

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  photoUrl?: string;
  status: AttendanceStatus;
}

export default function AttendanceScreen() {
  const [selectedClass] = useState('Grade 10A - Mathematics');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Ahmed Ali Khan', rollNumber: '001', status: null },
    { id: '2', name: 'Fatima Hassan', rollNumber: '002', status: null },
    { id: '3', name: 'Hassan Ahmed', rollNumber: '003', status: null },
    { id: '4', name: 'Ayesha Malik', rollNumber: '004', status: null },
    { id: '5', name: 'Usman Tariq', rollNumber: '005', status: null },
    { id: '6', name: 'Zainab Hassan', rollNumber: '006', status: null },
    { id: '7', name: 'Ali Raza', rollNumber: '007', status: null },
    { id: '8', name: 'Maryam Siddiqui', rollNumber: '008', status: null },
    { id: '9', name: 'Omar Farooq', rollNumber: '009', status: null },
    { id: '10', name: 'Sara Khan', rollNumber: '010', status: null },
    { id: '11', name: 'Ibrahim Ali', rollNumber: '011', status: null },
    { id: '12', name: 'Aisha Ahmed', rollNumber: '012', status: null },
    { id: '13', name: 'Bilal Hassan', rollNumber: '013', status: null },
    { id: '14', name: 'Hira Malik', rollNumber: '014', status: null },
    { id: '15', name: 'Hamza Tariq', rollNumber: '015', status: null },
  ]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const markAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    Alert.alert(
      'Mark All Present',
      'Are you sure you want to mark all students as present?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setStudents(prev =>
              prev.map(student => ({ ...student, status: 'present' as AttendanceStatus }))
            );
          },
        },
      ]
    );
  };

  const handleQRScan = () => {
    Alert.alert(
      'QR Code Scanner',
      'QR Code scanning feature will be implemented here. Students can scan their ID cards for quick attendance.',
      [{ text: 'OK' }]
    );
  };

  const submitAttendance = () => {
    const unmarked = students.filter(s => s.status === null).length;
    
    if (unmarked > 0) {
      Alert.alert(
        'Incomplete Attendance',
        `${unmarked} student(s) not marked. Continue anyway?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Submit',
            onPress: () => {
              Alert.alert('Success', 'Attendance submitted successfully!');
            },
          },
        ]
      );
    } else {
      Alert.alert('Success', 'Attendance submitted successfully!');
    }
  };

  const getStatusCounts = () => {
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const late = students.filter(s => s.status === 'late').length;
    const unmarked = students.filter(s => s.status === null).length;
    return { present, absent, late, unmarked };
  };

  const counts = getStatusCounts();

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <View style={styles.studentCard}>
      {/* Student Photo/Avatar */}
      <View style={styles.studentAvatar}>
        <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
      </View>

      {/* Student Info */}
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.rollNumber}>Roll No: {item.rollNumber}</Text>
      </View>

      {/* Radio Buttons */}
      <View style={styles.radioGroup}>
        {/* Present */}
        <TouchableOpacity
          style={[
            styles.radioButton,
            item.status === 'present' && styles.radioButtonActivePresent,
          ]}
          onPress={() => markAttendance(item.id, 'present')}
          activeOpacity={0.7}
        >
          <View style={[
            styles.radioOuter,
            { borderColor: AppColors.status.success.main },
            item.status === 'present' && { backgroundColor: AppColors.status.success.main },
          ]}>
            {item.status === 'present' && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={[
            styles.radioLabel,
            item.status === 'present' && { color: AppColors.status.success.main, fontWeight: '700' },
          ]}>
            P
          </Text>
        </TouchableOpacity>

        {/* Late */}
        <TouchableOpacity
          style={[
            styles.radioButton,
            item.status === 'late' && styles.radioButtonActiveLate,
          ]}
          onPress={() => markAttendance(item.id, 'late')}
          activeOpacity={0.7}
        >
          <View style={[
            styles.radioOuter,
            { borderColor: AppColors.status.warning.main },
            item.status === 'late' && { backgroundColor: AppColors.status.warning.main },
          ]}>
            {item.status === 'late' && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={[
            styles.radioLabel,
            item.status === 'late' && { color: AppColors.status.warning.main, fontWeight: '700' },
          ]}>
            L
          </Text>
        </TouchableOpacity>

        {/* Absent */}
        <TouchableOpacity
          style={[
            styles.radioButton,
            item.status === 'absent' && styles.radioButtonActiveAbsent,
          ]}
          onPress={() => markAttendance(item.id, 'absent')}
          activeOpacity={0.7}
        >
          <View style={[
            styles.radioOuter,
            { borderColor: AppColors.status.error.main },
            item.status === 'absent' && { backgroundColor: AppColors.status.error.main },
          ]}>
            {item.status === 'absent' && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={[
            styles.radioLabel,
            item.status === 'absent' && { color: AppColors.status.error.main, fontWeight: '700' },
          ]}>
            A
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const DatePickerModal = () => {
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
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
          <View style={styles.datePickerContent}>
            <Text style={styles.datePickerTitle}>Select Date</Text>
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateOption,
                  date.toDateString() === selectedDate.toDateString() && styles.dateOptionSelected,
                ]}
                onPress={() => {
                  setSelectedDate(date);
                  setShowDatePicker(false);
                }}
              >
                <Text style={[
                  styles.dateOptionText,
                  date.toDateString() === selectedDate.toDateString() && styles.dateOptionTextSelected,
                ]}>
                  {formatDate(date)}
                </Text>
                {date.toDateString() === selectedDate.toDateString() && (
                  <IconSymbol name="checkmark" size={20} color={AppColors.primary.main} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.className}>{selectedClass}</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <IconSymbol name="calendar" size={16} color={AppColors.primary.main} />
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
              <IconSymbol name="chevron.down" size={14} color={AppColors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bulk Action Button */}
        <TouchableOpacity
          style={styles.markAllButton}
          onPress={markAllPresent}
          activeOpacity={0.7}
        >
          <IconSymbol name="checkmark.circle.fill" size={20} color={AppColors.primary.contrast} />
          <Text style={styles.markAllButtonText}>Mark All Present</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: AppColors.status.success.background }]}>
          <Text style={[styles.statNumber, { color: AppColors.status.success.main }]}>
            {counts.present}
          </Text>
          <Text style={[styles.statLabel, { color: AppColors.status.success.text }]}>
            Present
          </Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: AppColors.status.warning.background }]}>
          <Text style={[styles.statNumber, { color: AppColors.status.warning.main }]}>
            {counts.late}
          </Text>
          <Text style={[styles.statLabel, { color: AppColors.status.warning.text }]}>
            Late
          </Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: AppColors.status.error.background }]}>
          <Text style={[styles.statNumber, { color: AppColors.status.error.main }]}>
            {counts.absent}
          </Text>
          <Text style={[styles.statLabel, { color: AppColors.status.error.text }]}>
            Absent
          </Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: AppColors.background.secondary }]}>
          <Text style={[styles.statNumber, { color: AppColors.text.secondary }]}>
            {counts.unmarked}
          </Text>
          <Text style={[styles.statLabel, { color: AppColors.text.secondary }]}>
            Unmarked
          </Text>
        </View>
      </View>

      {/* Student List */}
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitAttendance}
          activeOpacity={0.8}
        >
          <IconSymbol name="checkmark.seal.fill" size={20} color={AppColors.primary.contrast} />
          <Text style={styles.submitButtonText}>Submit Attendance</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Action Button - QR Scanner */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleQRScan}
        activeOpacity={0.8}
      >
        <IconSymbol name="qrcode" size={28} color={AppColors.primary.contrast} />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DatePickerModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },

  // Header
  header: {
    backgroundColor: AppColors.background.secondary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  headerTop: {
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  className: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.sm,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.ui.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    gap: Spacing.xs,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.text.primary,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.status.success.main,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
    // Shadow
    shadowColor: AppColors.status.success.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  markAllButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  statBox: {
    flex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },

  // List
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // Student Card
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    // Shadow
    shadowColor: AppColors.ui.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: AppColors.primary.contrast,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginBottom: 2,
  },
  rollNumber: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },

  // Radio Buttons
  radioGroup: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  radioButton: {
    alignItems: 'center',
    gap: 4,
  },
  radioButtonActivePresent: {
    // Additional styling when present is selected
  },
  radioButtonActiveLate: {
    // Additional styling when late is selected
  },
  radioButtonActiveAbsent: {
    // Additional styling when absent is selected
  },
  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.contrast,
  },
  radioLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: AppColors.text.secondary,
  },

  // Submit Button
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
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Platform.OS === 'ios' ? 100 : 80,
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow
    shadowColor: AppColors.secondary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  // Date Picker Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.ui.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerContent: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: '85%',
    maxHeight: '70%',
  },
  datePickerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.md,
  },
  dateOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  dateOptionSelected: {
    backgroundColor: AppColors.background.secondary,
  },
  dateOptionText: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  dateOptionTextSelected: {
    color: AppColors.primary.main,
    fontWeight: '700',
  },
});
