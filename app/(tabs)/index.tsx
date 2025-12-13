/**
 * Dashboard Screen (Home Tab)
 * 
 * Optimized main dashboard with:
 * - Animated counters
 * - Detailed report modal
 * - Functional quick attendance
 * - Notification system
 */

import { AttendanceSummaryCard } from '@/components/dashboard/AttendanceSummaryCard';
import { DetailedReportModal } from '@/components/dashboard/DetailedReportModal';
import { NotificationModal } from '@/components/dashboard/NotificationModal';
import { ScheduleCard } from '@/components/dashboard/ScheduleCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export default function DashboardScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  


  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Assignment Deadline',
      message: 'Mathematics assignment due tomorrow',
      time: '2 hours ago',
      type: 'warning',
      read: false,
    },
    {
      id: '2',
      title: 'New Message',
      message: 'Parent of Ahmed Ali sent a message',
      time: '3 hours ago',
      type: 'info',
      read: false,
    },
    {
      id: '3',
      title: 'Attendance Submitted',
      message: 'Grade 10A attendance marked successfully',
      time: '5 hours ago',
      type: 'success',
      read: true,
    },
    {
      id: '4',
      title: 'Exam Schedule',
      message: 'Mid-term exams starting next week',
      time: '1 day ago',
      type: 'info',
      read: true,
    },
    {
      id: '5',
      title: 'Grade Submission',
      message: 'Please submit grades for Physics class',
      time: '2 days ago',
      type: 'warning',
      read: true,
    },
  ]);

  // Mock data
  const teacherName = 'Dr. Sarah Johnson';
  const totalStudents = 245;
  const todayAttendancePercent = 92;
  const pendingTasks = 12;
  const upcomingDeadlines = 3;

  // Class schedule for current class detection
  const classSchedule = [
    {
      id: '1',
      className: 'Grade 10A',
      subject: 'Mathematics',
      startTime: '09:00',
      endTime: '10:00',
      room: 'Room 204',
      studentsCount: 32,
      dayOfWeek: 1, // Monday
    },
    {
      id: '2',
      className: 'Grade 11A',
      subject: 'Physics',
      startTime: '10:30',
      endTime: '11:30',
      room: 'Lab 305',
      studentsCount: 30,
      dayOfWeek: 1, // Monday
    },
    {
      id: '3',
      className: 'Grade 12A',
      subject: 'Chemistry',
      startTime: '13:00',
      endTime: '14:00',
      room: 'Lab 101',
      studentsCount: 24,
      dayOfWeek: 1, // Monday
    },
  ];

  // Get current or next class
  const getCurrentClass = () => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Find class that matches current day and time
    const runningClass = classSchedule.find(cls => {
      if (cls.dayOfWeek !== currentDay) return false;
      return currentTime >= cls.startTime && currentTime <= cls.endTime;
    });

    if (runningClass) {
      return { ...runningClass, isLive: true };
    }

    // If no class is running, find the next class
    const upcomingClass = classSchedule.find(cls => {
      if (cls.dayOfWeek !== currentDay) return false;
      return currentTime < cls.startTime;
    });

    return upcomingClass ? { ...upcomingClass, isLive: false } : { ...classSchedule[0], isLive: false };
  };

  const currentClassData = getCurrentClass();
  const nextClass = {
    subject: currentClassData.subject,
    grade: currentClassData.className,
    time: `${currentClassData.startTime} - ${currentClassData.endTime}`,
    room: currentClassData.room,
    studentsCount: currentClassData.studentsCount,
    isLive: currentClassData.isLive,
  };

  const todayAttendance = {
    present: 226,
    absent: 19,
    total: 245,
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };



  const handleQuickAttendance = () => {
    Alert.alert(
      '📋 Quick Attendance',
      `Mark attendance for ${nextClass.grade}?\n\nSubject: ${nextClass.subject}\nTime: ${nextClass.time}\nRoom: ${nextClass.room}\nStudents: ${nextClass.studentsCount}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Attendance',
          onPress: () => {
            Alert.alert('✅ Success', 'Opening attendance screen for Grade 10A...\n\nYou can now mark attendance for all 32 students.');
          },
        },
      ]
    );
  };

  const handleStatCard = (type: string) => {
    switch (type) {
      case 'students':
        Alert.alert(
          '👥 Total Students',
          `You teach ${totalStudents} students across all classes\n\n📚 Class Distribution:\n• Grade 10A: 32 students\n• Grade 10B: 28 students\n• Grade 11A: 30 students\n• Grade 11B: 26 students\n• Grade 12A: 24 students\n• And more...`
        );
        break;
      case 'attendance':
        Alert.alert(
          '✅ Today\'s Attendance',
          `${todayAttendancePercent}% students are present today\n\n📊 Details:\n• Present: 226 students\n• Absent: 19 students\n• Total: 245 students\n\nGreat attendance rate!`
        );
        break;
      case 'tasks':
        Alert.alert(
          '📝 Pending Tasks',
          `You have ${pendingTasks} pending tasks:\n\n📋 Breakdown:\n• Grade assignments: 5\n• Review submissions: 4\n• Parent meetings: 3\n\nStay organized!`
        );
        break;
      case 'deadlines':
        Alert.alert(
          '⏰ Upcoming Deadlines',
          `${upcomingDeadlines} deadlines approaching:\n\n📅 Schedule:\n• Math assignment (Tomorrow)\n• Physics quiz (2 days)\n• Chemistry project (3 days)\n\nPlan ahead!`
        );
        break;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: colors.primary.main, shadowColor: colors.primary.main }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerGreeting, { color: colors.primary.contrast }]}>Good Morning! 👋</Text>
          <Text style={[styles.headerName, { color: colors.primary.contrast }]}>{teacherName}</Text>
        </View>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setShowNotifications(true)}
          activeOpacity={0.7}
        >
          <IconSymbol name="bell.fill" size={24} color={colors.primary.contrast} />
          {unreadCount > 0 && (
            <View style={[styles.notificationBadge, { backgroundColor: colors.status.error.main }]}>
              <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Quick Stats Row - With Animated Counters */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Overview</Text>
        <View style={styles.statsGrid}>
          <StatsCard 
            type="students" 
            value={totalStudents} 
            label="Total Students" 
            onPress={() => handleStatCard('students')} 
          />
          <StatsCard 
            type="attendance" 
            value={todayAttendancePercent} 
            label="Today's Attendance" 
            onPress={() => handleStatCard('attendance')} 
            isPercentage
          />
          <StatsCard 
            type="tasks" 
            value={pendingTasks} 
            label="Pending Tasks" 
            onPress={() => handleStatCard('tasks')} 
          />
          <StatsCard 
            type="deadlines" 
            value={upcomingDeadlines} 
            label="Upcoming Deadlines" 
            onPress={() => handleStatCard('deadlines')} 
          />
        </View>
      </View>

      {/* Today's Schedule Card - Next Class */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Next Class</Text>
        <ScheduleCard
          subject={nextClass.subject}
          grade={nextClass.grade}
          time={nextClass.time}
          room={nextClass.room}
          studentsCount={nextClass.studentsCount}
          onQuickAttendance={handleQuickAttendance}
        />
      </View>

      {/* Attendance Summary */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Today's Attendance Summary</Text>
        <AttendanceSummaryCard
          present={todayAttendance.present}
          absent={todayAttendance.absent}
          total={todayAttendance.total}
          onViewDetails={() => setShowReportModal(true)}
        />
      </View>

      {/* Modals */}
      <NotificationModal 
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
      />
      <DetailedReportModal 
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
        stats={todayAttendance}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },

  // Header Section
  header: {
    backgroundColor: AppColors.primary.main,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerLeft: {
    flex: 1,
  },
  headerGreeting: {
    fontSize: FontSizes.base,
    color: AppColors.primary.contrast,
    opacity: 0.9,
    marginBottom: Spacing.xs,
  },
  headerName: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
    color: AppColors.primary.contrast,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: AppColors.status.error.main,
    borderRadius: BorderRadius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: AppColors.text.inverse,
  },

  // Section
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  lastSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.primary.main,
    marginBottom: Spacing.md,
  },

  // Stats Section
  statsSection: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '47%',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    shadowColor: AppColors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statNumber: {
    fontSize: FontSizes['3xl'],
    fontWeight: 'bold',
    color: AppColors.text.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Schedule Card
  scheduleCard: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: AppColors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scheduleHeaderLeft: {
    flex: 1,
  },
  scheduleSubject: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.xs,
  },
  scheduleGrade: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    fontWeight: '500',
  },
  scheduleTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    gap: 4,
  },
  scheduleTime: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    fontWeight: '600',
  },
  scheduleDivider: {
    height: 1,
    backgroundColor: AppColors.ui.divider,
    marginVertical: Spacing.md,
  },
  scheduleDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  scheduleDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  scheduleDetailText: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  quickAttendanceButton: {
    backgroundColor: AppColors.primary.main,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  quickAttendanceButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Attendance Summary Card
  attendanceCard: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: AppColors.ui.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  attendanceProgressContainer: {
    marginBottom: Spacing.lg,
  },
  attendanceProgressBackground: {
    height: 12,
    backgroundColor: AppColors.background.secondary,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  attendanceProgressFill: {
    height: '100%',
    backgroundColor: AppColors.status.success.main,
    borderRadius: BorderRadius.full,
  },
  attendanceProgressText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  attendanceStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  attendanceStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  attendanceStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  attendanceStatDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
  },
  attendanceStatLabel: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    fontWeight: '500',
  },
  attendanceStatNumber: {
    fontSize: FontSizes['2xl'],
    fontWeight: 'bold',
  },
  attendanceStatDivider: {
    width: 1,
    backgroundColor: AppColors.ui.divider,
    marginHorizontal: Spacing.sm,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
  },
  viewDetailsButtonText: {
    fontSize: FontSizes.base,
    color: AppColors.primary.main,
    fontWeight: '600',
  },

  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.ui.overlay,
    justifyContent: 'flex-end',
  },

  // Notification Modal
  notificationModal: {
    backgroundColor: AppColors.ui.card,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '80%',
    paddingBottom: Spacing.xl,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  notificationTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: AppColors.text.primary,
  },
  notificationList: {
    maxHeight: 500,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.divider,
    gap: Spacing.md,
  },
  notificationItemUnread: {
    backgroundColor: AppColors.primary.main + '08',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  notificationItemTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.main,
  },
  notificationMessage: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    fontSize: FontSizes.xs,
    color: AppColors.text.tertiary,
  },
  markAllButton: {
    margin: Spacing.lg,
    marginTop: Spacing.md,
    backgroundColor: AppColors.primary.main,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  markAllButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Detailed Report Modal
  reportModal: {
    backgroundColor: AppColors.ui.card,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '90%',
    paddingBottom: Spacing.lg,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  reportHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reportTitle: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: AppColors.text.primary,
  },
  reportContent: {
    maxHeight: 600,
  },
  reportSection: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.divider,
  },
  reportSectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.md,
  },
  reportSummaryCard: {
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  reportSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportLabel: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    fontWeight: '500',
  },
  reportValue: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '600',
  },
  reportStatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  reportStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  reportStatIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportStatInfo: {
    flex: 1,
  },
  reportStatLabel: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginBottom: 2,
  },
  reportStatDescription: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },
  reportStatNumber: {
    fontSize: FontSizes['3xl'],
    fontWeight: 'bold',
  },
  classBreakdownCard: {
    backgroundColor: AppColors.background.secondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  classBreakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  classBreakdownName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
  },
  classBreakdownPercentage: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  classBreakdownStats: {
    marginBottom: Spacing.xs,
  },
  classBreakdownText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },
  classProgressBar: {
    height: 6,
    backgroundColor: AppColors.ui.divider,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  classProgressFill: {
    height: '100%',
    backgroundColor: AppColors.status.success.main,
    borderRadius: BorderRadius.full,
  },
  insightCard: {
    backgroundColor: AppColors.status.info.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.status.info.main,
  },
  insightText: {
    fontSize: FontSizes.base,
    color: AppColors.status.info.text,
    fontWeight: '500',
  },
  reportCloseButton: {
    margin: Spacing.lg,
    marginTop: Spacing.md,
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
  reportCloseButtonText: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },
});
