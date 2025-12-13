/**
 * My Classes Screen
 * 
 * Optimized with:
 * - Beautiful class details modal
 * - Functional take attendance with UI modal
 * - Smooth animations
 * - Filter functionality
 * - Optimized code
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ClassItem {
  id: string;
  className: string;
  grade: string;
  section: string;
  subject: string;
  totalStudents: number;
  nextClassTime: string;
  nextClassDay: string;
  room: string;
  schedule: string;
  averageAttendance: number;
  recentTests: number;
  pendingAssignments: number;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  status: 'present' | 'late' | 'absent' | null;
}

export default function ClassesScreen() {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [showSubjectFilter, setShowSubjectFilter] = useState(false);
  const [showGradeFilter, setShowGradeFilter] = useState(false);
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [students, setStudents] = useState<Student[]>([]);

  // Mock data
  const allClasses: ClassItem[] = [
    {
      id: '1',
      className: 'Grade 10 - Section A',
      grade: '10',
      section: 'A',
      subject: 'Mathematics',
      totalStudents: 32,
      nextClassTime: '9:00 AM',
      nextClassDay: 'Tomorrow',
      room: 'Room 204',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      averageAttendance: 94,
      recentTests: 3,
      pendingAssignments: 2,
    },
    {
      id: '2',
      className: 'Grade 10 - Section B',
      grade: '10',
      section: 'B',
      subject: 'Mathematics',
      totalStudents: 28,
      nextClassTime: '10:30 AM',
      nextClassDay: 'Today',
      room: 'Room 204',
      schedule: 'Tue, Thu - 10:30 AM',
      averageAttendance: 91,
      recentTests: 3,
      pendingAssignments: 1,
    },
    {
      id: '3',
      className: 'Grade 11 - Section A',
      grade: '11',
      section: 'A',
      subject: 'Physics',
      totalStudents: 30,
      nextClassTime: '11:00 AM',
      nextClassDay: 'Today',
      room: 'Lab 305',
      schedule: 'Mon, Wed - 11:00 AM',
      averageAttendance: 93,
      recentTests: 2,
      pendingAssignments: 3,
    },
    {
      id: '4',
      className: 'Grade 11 - Section B',
      grade: '11',
      section: 'B',
      subject: 'Physics',
      totalStudents: 26,
      nextClassTime: '2:00 PM',
      nextClassDay: 'Tomorrow',
      room: 'Lab 305',
      schedule: 'Tue, Thu, Fri - 2:00 PM',
      averageAttendance: 89,
      recentTests: 2,
      pendingAssignments: 2,
    },
    {
      id: '5',
      className: 'Grade 12 - Section A',
      grade: '12',
      section: 'A',
      subject: 'Chemistry',
      totalStudents: 24,
      nextClassTime: '1:00 PM',
      nextClassDay: 'Today',
      room: 'Lab 101',
      schedule: 'Mon, Wed, Fri - 1:00 PM',
      averageAttendance: 92,
      recentTests: 4,
      pendingAssignments: 1,
    },
    {
      id: '6',
      className: 'Grade 12 - Section B',
      grade: '12',
      section: 'B',
      subject: 'Chemistry',
      totalStudents: 22,
      nextClassTime: '3:00 PM',
      nextClassDay: 'Tomorrow',
      room: 'Lab 101',
      schedule: 'Tue, Thu - 3:00 PM',
      averageAttendance: 90,
      recentTests: 4,
      pendingAssignments: 2,
    },
    {
      id: '7',
      className: 'Grade 9 - Section A',
      grade: '9',
      section: 'A',
      subject: 'Science',
      totalStudents: 35,
      nextClassTime: '8:00 AM',
      nextClassDay: 'Today',
      room: 'Room 102',
      schedule: 'Mon, Tue, Thu - 8:00 AM',
      averageAttendance: 95,
      recentTests: 2,
      pendingAssignments: 1,
    },
    {
      id: '8',
      className: 'Grade 9 - Section B',
      grade: '9',
      section: 'B',
      subject: 'Science',
      totalStudents: 33,
      nextClassTime: '9:30 AM',
      nextClassDay: 'Tomorrow',
      room: 'Room 102',
      schedule: 'Mon, Wed, Fri - 9:30 AM',
      averageAttendance: 92,
      recentTests: 2,
      pendingAssignments: 2,
    },
  ];

  const subjects = ['All', ...Array.from(new Set(allClasses.map(c => c.subject)))];
  const grades = ['All', ...Array.from(new Set(allClasses.map(c => c.grade))).sort()];

  const filteredClasses = allClasses.filter(classItem => {
    const matchesSubject = selectedSubject === 'All' || classItem.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || classItem.grade === selectedGrade;
    return matchesSubject && matchesGrade;
  });

  // Generate mock students for selected class
  const generateStudents = (count: number): Student[] => {
    const names = [
      'Ahmed Ali', 'Fatima Hassan', 'Hassan Ahmed', 'Ayesha Malik',
      'Usman Tariq', 'Zainab Hassan', 'Ali Raza', 'Maryam Siddiqui',
      'Omar Farooq', 'Sara Khan', 'Ibrahim Ali', 'Aisha Ahmed',
      'Bilal Hassan', 'Hira Malik', 'Hamza Tariq', 'Zara Ali',
      'Faisal Ahmed', 'Noor Hassan', 'Kamran Ali', 'Sana Malik',
    ];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `${i + 1}`,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
      rollNumber: String(i + 1).padStart(3, '0'),
      status: null,
    }));
  };

  const handleViewClass = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setShowClassDetails(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseDetails = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowClassDetails(false);
      setSelectedClass(null);
    });
  };

  const handleTakeAttendance = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setStudents(generateStudents(classItem.totalStudents));
    setShowAttendanceModal(true);
  };

  const markAttendance = (studentId: string, status: 'present' | 'late' | 'absent') => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents(prev =>
      prev.map(student => ({ ...student, status: 'present' as const }))
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
              setShowAttendanceModal(false);
              Alert.alert('✅ Success', `Attendance submitted for ${selectedClass?.className}!`);
            },
          },
        ]
      );
    } else {
      setShowAttendanceModal(false);
      Alert.alert('✅ Success', `Attendance submitted for ${selectedClass?.className}!`);
    }
  };

  const getStatusCounts = () => {
    const present = students.filter(s => s.status === 'present').length;
    const late = students.filter(s => s.status === 'late').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const unmarked = students.filter(s => s.status === null).length;
    return { present, late, absent, unmarked };
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Attendance Modal Component
  const AttendanceModal = () => {
    if (!selectedClass) return null;
    const counts = getStatusCounts();

    return (
      <Modal
        visible={showAttendanceModal}
        animationType="slide"
        onRequestClose={() => setShowAttendanceModal(false)}
      >
        <View style={styles.attendanceContainer}>
          {/* Header */}
          <View style={styles.attendanceHeader}>
            <TouchableOpacity
              onPress={() => setShowAttendanceModal(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <IconSymbol name="chevron.left" size={24} color={AppColors.primary.contrast} />
            </TouchableOpacity>
            <View style={styles.attendanceHeaderCenter}>
              <Text style={styles.attendanceHeaderTitle}>Take Attendance</Text>
              <Text style={styles.attendanceHeaderSubtitle}>{selectedClass.className}</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          {/* Class Info Card */}
          <View style={styles.attendanceClassInfo}>
            <View style={styles.attendanceClassInfoRow}>
              <IconSymbol name="book.fill" size={18} color={AppColors.primary.main} />
              <Text style={styles.attendanceClassInfoText}>{selectedClass.subject}</Text>
            </View>
            <View style={styles.attendanceClassInfoRow}>
              <IconSymbol name="location.fill" size={18} color={AppColors.primary.main} />
              <Text style={styles.attendanceClassInfoText}>{selectedClass.room}</Text>
            </View>
            <View style={styles.attendanceClassInfoRow}>
              <IconSymbol name="clock.fill" size={18} color={AppColors.primary.main} />
              <Text style={styles.attendanceClassInfoText}>{selectedClass.nextClassTime}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.attendanceStats}>
            <View style={[styles.attendanceStatBox, { backgroundColor: AppColors.status.success.background }]}>
              <Text style={[styles.attendanceStatNumber, { color: AppColors.status.success.main }]}>
                {counts.present}
              </Text>
              <Text style={[styles.attendanceStatLabel, { color: AppColors.status.success.text }]}>
                Present
              </Text>
            </View>
            <View style={[styles.attendanceStatBox, { backgroundColor: AppColors.status.warning.background }]}>
              <Text style={[styles.attendanceStatNumber, { color: AppColors.status.warning.main }]}>
                {counts.late}
              </Text>
              <Text style={[styles.attendanceStatLabel, { color: AppColors.status.warning.text }]}>
                Late
              </Text>
            </View>
            <View style={[styles.attendanceStatBox, { backgroundColor: AppColors.status.error.background }]}>
              <Text style={[styles.attendanceStatNumber, { color: AppColors.status.error.main }]}>
                {counts.absent}
              </Text>
              <Text style={[styles.attendanceStatLabel, { color: AppColors.status.error.text }]}>
                Absent
              </Text>
            </View>
            <View style={[styles.attendanceStatBox, { backgroundColor: AppColors.background.secondary }]}>
              <Text style={[styles.attendanceStatNumber, { color: AppColors.text.secondary }]}>
                {counts.unmarked}
              </Text>
              <Text style={[styles.attendanceStatLabel, { color: AppColors.text.secondary }]}>
                Unmarked
              </Text>
            </View>
          </View>

          {/* Mark All Button */}
          <View style={styles.markAllContainer}>
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={markAllPresent}
              activeOpacity={0.7}
            >
              <IconSymbol name="checkmark.circle.fill" size={20} color={AppColors.primary.contrast} />
              <Text style={styles.markAllButtonText}>Mark All Present</Text>
            </TouchableOpacity>
          </View>

          {/* Student List */}
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.attendanceList}
            renderItem={({ item }) => (
              <View style={styles.attendanceStudentCard}>
                {/* Student Info */}
                <View style={styles.attendanceStudentInfo}>
                  <View style={styles.attendanceStudentAvatar}>
                    <Text style={styles.attendanceAvatarText}>{getInitials(item.name)}</Text>
                  </View>
                  <View style={styles.attendanceStudentDetails}>
                    <Text style={styles.attendanceStudentName}>{item.name}</Text>
                    <Text style={styles.attendanceStudentRoll}>Roll No: {item.rollNumber}</Text>
                  </View>
                </View>

                {/* Radio Buttons */}
                <View style={styles.attendanceRadioGroup}>
                  {/* Present */}
                  <TouchableOpacity
                    style={styles.attendanceRadioButton}
                    onPress={() => markAttendance(item.id, 'present')}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.attendanceRadioOuter,
                      { borderColor: AppColors.status.success.main },
                      item.status === 'present' && { backgroundColor: AppColors.status.success.main },
                    ]}>
                      {item.status === 'present' && (
                        <View style={styles.attendanceRadioInner} />
                      )}
                    </View>
                    <Text style={[
                      styles.attendanceRadioLabel,
                      item.status === 'present' && { color: AppColors.status.success.main, fontWeight: '700' },
                    ]}>
                      P
                    </Text>
                  </TouchableOpacity>

                  {/* Late */}
                  <TouchableOpacity
                    style={styles.attendanceRadioButton}
                    onPress={() => markAttendance(item.id, 'late')}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.attendanceRadioOuter,
                      { borderColor: AppColors.status.warning.main },
                      item.status === 'late' && { backgroundColor: AppColors.status.warning.main },
                    ]}>
                      {item.status === 'late' && (
                        <View style={styles.attendanceRadioInner} />
                      )}
                    </View>
                    <Text style={[
                      styles.attendanceRadioLabel,
                      item.status === 'late' && { color: AppColors.status.warning.main, fontWeight: '700' },
                    ]}>
                      L
                    </Text>
                  </TouchableOpacity>

                  {/* Absent */}
                  <TouchableOpacity
                    style={styles.attendanceRadioButton}
                    onPress={() => markAttendance(item.id, 'absent')}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.attendanceRadioOuter,
                      { borderColor: AppColors.status.error.main },
                      item.status === 'absent' && { backgroundColor: AppColors.status.error.main },
                    ]}>
                      {item.status === 'absent' && (
                        <View style={styles.attendanceRadioInner} />
                      )}
                    </View>
                    <Text style={[
                      styles.attendanceRadioLabel,
                      item.status === 'absent' && { color: AppColors.status.error.main, fontWeight: '700' },
                    ]}>
                      A
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          {/* Submit Button */}
          <View style={styles.attendanceSubmitContainer}>
            <TouchableOpacity
              style={styles.attendanceSubmitButton}
              onPress={submitAttendance}
              activeOpacity={0.8}
            >
              <IconSymbol name="checkmark.seal.fill" size={20} color={AppColors.primary.contrast} />
              <Text style={styles.attendanceSubmitButtonText}>Submit Attendance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Class Details Modal (existing code continues...)
  const ClassDetailsModal = () => {
    if (!selectedClass) return null;

    return (
      <Modal
        visible={showClassDetails}
        transparent
        animationType="slide"
        onRequestClose={handleCloseDetails}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.detailsModal, { opacity: fadeAnim }]}>
            {/* Header */}
            <View style={styles.detailsHeader}>
              <View style={styles.detailsHeaderLeft}>
                <IconSymbol name="book.fill" size={28} color={AppColors.primary.main} />
                <View style={styles.detailsHeaderText}>
                  <Text style={styles.detailsTitle}>{selectedClass.className}</Text>
                  <Text style={styles.detailsSubtitle}>{selectedClass.subject}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleCloseDetails}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <IconSymbol name="xmark" size={24} color={AppColors.text.secondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
              {/* Quick Stats */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsSectionTitle}>📊 Quick Stats</Text>
                <View style={styles.detailsStatsGrid}>
                  <View style={styles.detailsStatCard}>
                    <IconSymbol name="person.2.fill" size={24} color={AppColors.primary.main} />
                    <Text style={styles.detailsStatNumber}>{selectedClass.totalStudents}</Text>
                    <Text style={styles.detailsStatLabel}>Students</Text>
                  </View>
                  <View style={styles.detailsStatCard}>
                    <IconSymbol name="checkmark.circle.fill" size={24} color={AppColors.status.success.main} />
                    <Text style={styles.detailsStatNumber}>{selectedClass.averageAttendance}%</Text>
                    <Text style={styles.detailsStatLabel}>Attendance</Text>
                  </View>
                  <View style={styles.detailsStatCard}>
                    <IconSymbol name="doc.text.fill" size={24} color={AppColors.status.warning.main} />
                    <Text style={styles.detailsStatNumber}>{selectedClass.pendingAssignments}</Text>
                    <Text style={styles.detailsStatLabel}>Pending</Text>
                  </View>
                </View>
              </View>

              {/* Class Information */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsSectionTitle}>📚 Class Information</Text>
                <View style={styles.detailsInfoCard}>
                  <View style={styles.detailsInfoRow}>
                    <IconSymbol name="location.fill" size={18} color={AppColors.primary.main} />
                    <Text style={styles.detailsInfoLabel}>Room:</Text>
                    <Text style={styles.detailsInfoValue}>{selectedClass.room}</Text>
                  </View>
                  <View style={styles.detailsInfoRow}>
                    <IconSymbol name="clock.fill" size={18} color={AppColors.primary.main} />
                    <Text style={styles.detailsInfoLabel}>Schedule:</Text>
                    <Text style={styles.detailsInfoValue}>{selectedClass.schedule}</Text>
                  </View>
                  <View style={styles.detailsInfoRow}>
                    <IconSymbol name="calendar" size={18} color={AppColors.primary.main} />
                    <Text style={styles.detailsInfoLabel}>Next Class:</Text>
                    <Text style={styles.detailsInfoValue}>
                      {selectedClass.nextClassDay} at {selectedClass.nextClassTime}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Recent Activity */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsSectionTitle}>📈 Recent Activity</Text>
                <View style={styles.activityCard}>
                  <View style={styles.activityItem}>
                    <View style={[styles.activityDot, { backgroundColor: AppColors.status.success.main }]} />
                    <Text style={styles.activityText}>
                      Attendance marked for {selectedClass.nextClassDay === 'Today' ? 'yesterday' : 'last class'}
                    </Text>
                  </View>
                  <View style={styles.activityItem}>
                    <View style={[styles.activityDot, { backgroundColor: AppColors.status.info.main }]} />
                    <Text style={styles.activityText}>
                      {selectedClass.recentTests} tests conducted this month
                    </Text>
                  </View>
                  <View style={styles.activityItem}>
                    <View style={[styles.activityDot, { backgroundColor: AppColors.status.warning.main }]} />
                    <Text style={styles.activityText}>
                      {selectedClass.pendingAssignments} assignments pending review
                    </Text>
                  </View>
                </View>
              </View>

              {/* Performance Overview */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsSectionTitle}>🎯 Performance Overview</Text>
                <View style={styles.performanceCard}>
                  <View style={styles.performanceRow}>
                    <Text style={styles.performanceLabel}>Average Attendance</Text>
                    <View style={styles.performanceBarContainer}>
                      <View style={styles.performanceBarBackground}>
                        <View 
                          style={[
                            styles.performanceBarFill, 
                            { 
                              width: `${selectedClass.averageAttendance}%`,
                              backgroundColor: 
                                selectedClass.averageAttendance >= 90 ? AppColors.status.success.main :
                                selectedClass.averageAttendance >= 75 ? AppColors.status.warning.main :
                                AppColors.status.error.main
                            }
                          ]} 
                        />
                      </View>
                      <Text style={styles.performanceValue}>{selectedClass.averageAttendance}%</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Quick Actions */}
              <View style={styles.detailsSection}>
                <Text style={styles.detailsSectionTitle}>⚡ Quick Actions</Text>
                <TouchableOpacity
                  style={styles.detailsActionButton}
                  onPress={() => {
                    handleCloseDetails();
                    setTimeout(() => handleTakeAttendance(selectedClass), 300);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.detailsActionIcon, { backgroundColor: AppColors.primary.main }]}>
                    <IconSymbol name="checkmark.circle.fill" size={24} color={AppColors.primary.contrast} />
                  </View>
                  <View style={styles.detailsActionText}>
                    <Text style={styles.detailsActionTitle}>Take Attendance</Text>
                    <Text style={styles.detailsActionSubtitle}>Mark attendance for this class</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={AppColors.text.tertiary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.detailsActionButton}
                  onPress={() => {
                    Alert.alert('View Students', `Showing ${selectedClass.totalStudents} students from ${selectedClass.className}`);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.detailsActionIcon, { backgroundColor: AppColors.status.info.main }]}>
                    <IconSymbol name="person.3.fill" size={24} color={AppColors.primary.contrast} />
                  </View>
                  <View style={styles.detailsActionText}>
                    <Text style={styles.detailsActionTitle}>View Students</Text>
                    <Text style={styles.detailsActionSubtitle}>See all {selectedClass.totalStudents} students</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={AppColors.text.tertiary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.detailsActionButton}
                  onPress={() => {
                    Alert.alert('Create Assignment', `Creating new assignment for ${selectedClass.className}`);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.detailsActionIcon, { backgroundColor: AppColors.status.warning.main }]}>
                    <IconSymbol name="doc.text.fill" size={24} color={AppColors.primary.contrast} />
                  </View>
                  <View style={styles.detailsActionText}>
                    <Text style={styles.detailsActionTitle}>Create Assignment</Text>
                    <Text style={styles.detailsActionSubtitle}>Add new assignment for class</Text>
                  </View>
                  <IconSymbol name="chevron.right" size={20} color={AppColors.text.tertiary} />
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.detailsCloseButton}
              onPress={handleCloseDetails}
              activeOpacity={0.8}
            >
              <Text style={styles.detailsCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  const FilterModal = ({
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
        <View style={styles.filterModalContent}>
          <Text style={styles.filterModalTitle}>{title}</Text>
          <ScrollView style={styles.filterModalScroll}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterModalOption,
                  selectedValue === option && styles.filterModalOptionSelected,
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.filterModalOptionText,
                    selectedValue === option && styles.filterModalOptionTextSelected,
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

  const renderClassCard = ({ item }: { item: ClassItem }) => (
    <View style={styles.classCard}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.className}>{item.className}</Text>
          <Text style={styles.subject}>{item.subject}</Text>
        </View>
        <View style={styles.gradeBadge}>
          <Text style={styles.gradeBadgeText}>Grade {item.grade}</Text>
        </View>
      </View>

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <IconSymbol name="person.2.fill" size={18} color={AppColors.primary.main} />
          <Text style={styles.detailText}>{item.totalStudents} Students</Text>
        </View>
        <View style={styles.detailRow}>
          <IconSymbol name="clock.fill" size={18} color={AppColors.primary.main} />
          <Text style={styles.detailText}>
            {item.nextClassDay} at {item.nextClassTime}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <IconSymbol name="location.fill" size={18} color={AppColors.primary.main} />
          <Text style={styles.detailText}>{item.room}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewClass(item)}
          activeOpacity={0.7}
        >
          <IconSymbol name="eye.fill" size={18} color={AppColors.primary.main} />
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.attendanceButton]}
          onPress={() => handleTakeAttendance(item)}
          activeOpacity={0.7}
        >
          <IconSymbol name="checkmark.circle.fill" size={18} color={AppColors.primary.contrast} />
          <Text style={styles.attendanceButtonText}>Take Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filters</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowSubjectFilter(true)}
          >
            <IconSymbol name="book.fill" size={16} color={AppColors.text.secondary} />
            <Text style={styles.filterButtonText}>
              {selectedSubject === 'All' ? 'Subject' : selectedSubject}
            </Text>
            <IconSymbol name="chevron.down" size={14} color={AppColors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowGradeFilter(true)}
          >
            <IconSymbol name="graduationcap.fill" size={16} color={AppColors.text.secondary} />
            <Text style={styles.filterButtonText}>
              {selectedGrade === 'All' ? 'Grade' : `Grade ${selectedGrade}`}
            </Text>
            <IconSymbol name="chevron.down" size={14} color={AppColors.text.secondary} />
          </TouchableOpacity>

          {(selectedSubject !== 'All' || selectedGrade !== 'All') && (
            <TouchableOpacity
              style={styles.clearFilterButton}
              onPress={() => {
                setSelectedSubject('All');
                setSelectedGrade('All');
              }}
            >
              <IconSymbol name="xmark.circle.fill" size={18} color={AppColors.status.error.main} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Classes Count */}
      <View style={styles.countSection}>
        <Text style={styles.countText}>
          {filteredClasses.length} {filteredClasses.length === 1 ? 'Class' : 'Classes'}
        </Text>
      </View>

      {/* Classes List */}
      <FlatList
        data={filteredClasses}
        renderItem={renderClassCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="tray.fill" size={64} color={AppColors.text.tertiary} />
            <Text style={styles.emptyText}>No classes found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
      />

      {/* Modals */}
      <FilterModal
        visible={showSubjectFilter}
        onClose={() => setShowSubjectFilter(false)}
        title="Select Subject"
        options={subjects}
        selectedValue={selectedSubject}
        onSelect={setSelectedSubject}
      />

      <FilterModal
        visible={showGradeFilter}
        onClose={() => setShowGradeFilter(false)}
        title="Select Grade"
        options={grades}
        selectedValue={selectedGrade}
        onSelect={setSelectedGrade}
      />

      <ClassDetailsModal />
      <AttendanceModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },

  // Filter Section
  filterSection: {
    backgroundColor: AppColors.background.secondary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  filterTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.text.secondary,
    marginBottom: Spacing.sm,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.ui.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    gap: Spacing.xs,
  },
  filterButtonText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  clearFilterButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.status.error.background,
    borderRadius: BorderRadius.full,
  },

  // Count Section
  countSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  countText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
  },

  // List
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // Class Card
  classCard: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    shadowColor: AppColors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  className: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.xs,
  },
  subject: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    fontWeight: '500',
  },
  gradeBadge: {
    backgroundColor: AppColors.primary.main,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  gradeBadgeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Card Details
  cardDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailText: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },

  // Card Actions
  cardActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: AppColors.ui.divider,
    paddingTop: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.xs,
  },
  viewButton: {
    backgroundColor: AppColors.background.secondary,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  viewButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.primary.main,
  },
  attendanceButton: {
    backgroundColor: AppColors.primary.main,
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  attendanceButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: AppColors.text.secondary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.base,
    color: AppColors.text.tertiary,
    marginTop: Spacing.xs,
  },

  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.ui.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Filter Modal
  filterModalContent: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: '80%',
    maxHeight: '60%',
  },
  filterModalTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.md,
  },
  filterModalScroll: {
    maxHeight: 300,
  },
  filterModalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  filterModalOptionSelected: {
    backgroundColor: AppColors.background.secondary,
  },
  filterModalOptionText: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  filterModalOptionTextSelected: {
    color: AppColors.primary.main,
    fontWeight: '700',
  },

  // Attendance Modal
  attendanceContainer: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  attendanceHeader: {
    backgroundColor: AppColors.primary.main,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attendanceHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  attendanceHeaderTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.primary.contrast,
  },
  attendanceHeaderSubtitle: {
    fontSize: FontSizes.base,
    color: AppColors.primary.contrast,
    opacity: 0.9,
    marginTop: 2,
  },
  attendanceClassInfo: {
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  attendanceClassInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  attendanceClassInfoText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  attendanceStats: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  attendanceStatBox: {
    flex: 1,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  attendanceStatNumber: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  attendanceStatLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  markAllContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
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
  attendanceList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  attendanceStudentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    shadowColor: AppColors.ui.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  attendanceStudentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  attendanceStudentAvatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  attendanceAvatarText: {
    fontSize: FontSizes.base,
    fontWeight: 'bold',
    color: AppColors.primary.contrast,
  },
  attendanceStudentDetails: {
    flex: 1,
  },
  attendanceStudentName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginBottom: 2,
  },
  attendanceStudentRoll: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },
  attendanceRadioGroup: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  attendanceRadioButton: {
    alignItems: 'center',
    gap: 4,
  },
  attendanceRadioOuter: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceRadioInner: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.contrast,
  },
  attendanceRadioLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: AppColors.text.secondary,
  },
  attendanceSubmitContainer: {
    padding: Spacing.lg,
    backgroundColor: AppColors.background.primary,
    borderTopWidth: 1,
    borderTopColor: AppColors.ui.border,
  },
  attendanceSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  attendanceSubmitButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Class Details Modal (existing styles continue...)
  detailsModal: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.xl,
    width: '90%',
    maxHeight: '85%',
    overflow: 'hidden',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
    backgroundColor: AppColors.background.secondary,
  },
  detailsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  detailsHeaderText: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
  },
  detailsSubtitle: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    marginTop: 2,
  },
  detailsContent: {
    maxHeight: 500,
  },
  detailsSection: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.divider,
  },
  detailsSectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.md,
  },
  detailsStatsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  detailsStatCard: {
    flex: 1,
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailsStatNumber: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
    color: AppColors.text.primary,
  },
  detailsStatLabel: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    fontWeight: '500',
  },
  detailsInfoCard: {
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  detailsInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailsInfoLabel: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    fontWeight: '500',
    width: 80,
  },
  detailsInfoValue: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '600',
    flex: 1,
  },
  activityCard: {
    gap: Spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  activityText: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    flex: 1,
  },
  performanceCard: {
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  performanceRow: {
    gap: Spacing.sm,
  },
  performanceLabel: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    fontWeight: '500',
  },
  performanceBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  performanceBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: AppColors.ui.divider,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  performanceBarFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  performanceValue: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: AppColors.text.primary,
    width: 45,
    textAlign: 'right',
  },
  detailsActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  detailsActionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsActionText: {
    flex: 1,
  },
  detailsActionTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginBottom: 2,
  },
  detailsActionSubtitle: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },
  detailsCloseButton: {
    margin: Spacing.lg,
    backgroundColor: AppColors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsCloseButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },
});
