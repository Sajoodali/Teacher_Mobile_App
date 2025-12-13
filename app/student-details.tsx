/**
 * Student Details Screen
 * 
 * Displays detailed information about a student including:
 * - Profile Header (Photo, Name, Roll Number)
 * - Tab View:
 *   - Overview: Attendance History Chart
 *   - Performance: Test scores and trends
 *   - Communication: Message Parent button
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import { AppColors, BorderRadius, FontSizes, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type TabType = 'overview' | 'performance' | 'communication';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
}

interface TestScore {
  subject: string;
  test: string;
  score: number;
  maxScore: number;
  date: string;
}

export default function StudentDetailsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Mock student data - replace with real data from navigation params or API
  const student = {
    id: '1',
    name: 'Ahmed Ali Khan',
    rollNumber: '001',
    class: 'Grade 10A',
    photoUrl: null, // Will use initials
    email: 'ahmed.ali@school.com',
    parentName: 'Mr. Ali Khan',
    parentPhone: '+92 300 1234567',
    parentEmail: 'ali.khan@email.com',
  };

  // Mock attendance data (last 30 days)
  const attendanceHistory: AttendanceRecord[] = [
    { date: '2024-12-12', status: 'present' },
    { date: '2024-12-11', status: 'present' },
    { date: '2024-12-10', status: 'late' },
    { date: '2024-12-09', status: 'present' },
    { date: '2024-12-08', status: 'absent' },
    { date: '2024-12-07', status: 'present' },
    { date: '2024-12-06', status: 'present' },
    { date: '2024-12-05', status: 'present' },
    { date: '2024-12-04', status: 'present' },
    { date: '2024-12-03', status: 'late' },
  ];

  // Mock test scores
  const testScores: TestScore[] = [
    { subject: 'Mathematics', test: 'Mid-Term Exam', score: 85, maxScore: 100, date: '2024-12-01' },
    { subject: 'Physics', test: 'Mid-Term Exam', score: 78, maxScore: 100, date: '2024-12-02' },
    { subject: 'Chemistry', test: 'Mid-Term Exam', score: 92, maxScore: 100, date: '2024-12-03' },
    { subject: 'English', test: 'Mid-Term Exam', score: 88, maxScore: 100, date: '2024-12-04' },
    { subject: 'Mathematics', test: 'Quiz 3', score: 18, maxScore: 20, date: '2024-11-25' },
    { subject: 'Physics', test: 'Quiz 3', score: 16, maxScore: 20, date: '2024-11-26' },
  ];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const calculateAttendanceStats = () => {
    const total = attendanceHistory.length;
    const present = attendanceHistory.filter(a => a.status === 'present').length;
    const late = attendanceHistory.filter(a => a.status === 'late').length;
    const absent = attendanceHistory.filter(a => a.status === 'absent').length;
    const percentage = Math.round((present / total) * 100);
    return { total, present, late, absent, percentage };
  };

  const calculateAverageScore = () => {
    const total = testScores.reduce((sum, test) => sum + (test.score / test.maxScore) * 100, 0);
    return Math.round(total / testScores.length);
  };

  const handleMessageParent = () => {
    Alert.alert(
      'Message Parent',
      `Send a message to ${student.parentName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Message',
          onPress: () => {
            Alert.alert('Success', 'Message interface will open here');
          },
        },
      ]
    );
  };

  const handleCallParent = () => {
    Alert.alert(
      'Call Parent',
      `Call ${student.parentName} at ${student.parentPhone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Alert.alert('Calling', `Calling ${student.parentPhone}...`);
          },
        },
      ]
    );
  };

  const stats = calculateAttendanceStats();
  const averageScore = calculateAverageScore();

  // Overview Tab Content
  const OverviewTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Attendance Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Summary</Text>
        
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: AppColors.status.success.background }]}>
            <Text style={[styles.statNumber, { color: AppColors.status.success.main }]}>
              {stats.percentage}%
            </Text>
            <Text style={[styles.statLabel, { color: AppColors.status.success.text }]}>
              Attendance Rate
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: AppColors.primary.main + '15' }]}>
            <Text style={[styles.statNumber, { color: AppColors.primary.main }]}>
              {stats.total}
            </Text>
            <Text style={[styles.statLabel, { color: AppColors.text.secondary }]}>
              Total Days
            </Text>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.detailStatsContainer}>
          <View style={styles.detailStatRow}>
            <View style={styles.detailStatLeft}>
              <View style={[styles.statusDot, { backgroundColor: AppColors.status.success.main }]} />
              <Text style={styles.detailStatLabel}>Present</Text>
            </View>
            <Text style={styles.detailStatValue}>{stats.present} days</Text>
          </View>
          <View style={styles.detailStatRow}>
            <View style={styles.detailStatLeft}>
              <View style={[styles.statusDot, { backgroundColor: AppColors.status.warning.main }]} />
              <Text style={styles.detailStatLabel}>Late</Text>
            </View>
            <Text style={styles.detailStatValue}>{stats.late} days</Text>
          </View>
          <View style={styles.detailStatRow}>
            <View style={styles.detailStatLeft}>
              <View style={[styles.statusDot, { backgroundColor: AppColors.status.error.main }]} />
              <Text style={styles.detailStatLabel}>Absent</Text>
            </View>
            <Text style={styles.detailStatValue}>{stats.absent} days</Text>
          </View>
        </View>
      </View>

      {/* Recent Attendance History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Attendance</Text>
        <View style={styles.attendanceList}>
          {attendanceHistory.slice(0, 7).map((record, index) => (
            <View key={index} style={styles.attendanceItem}>
              <Text style={styles.attendanceDate}>
                {new Date(record.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Text>
              <View style={[
                styles.attendanceStatus,
                { backgroundColor: 
                  record.status === 'present' ? AppColors.status.success.background :
                  record.status === 'late' ? AppColors.status.warning.background :
                  AppColors.status.error.background
                }
              ]}>
                <Text style={[
                  styles.attendanceStatusText,
                  { color: 
                    record.status === 'present' ? AppColors.status.success.text :
                    record.status === 'late' ? AppColors.status.warning.text :
                    AppColors.status.error.text
                  }
                ]}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  // Performance Tab Content
  const PerformanceTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Overall Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Performance</Text>
        
        <View style={styles.performanceCard}>
          <View style={styles.performanceHeader}>
            <IconSymbol name="chart.bar.fill" size={32} color={AppColors.primary.main} />
            <View style={styles.performanceHeaderText}>
              <Text style={styles.performanceTitle}>Average Score</Text>
              <Text style={styles.performanceSubtitle}>Across all subjects</Text>
            </View>
          </View>
          <Text style={styles.performanceScore}>{averageScore}%</Text>
          <View style={styles.performanceBar}>
            <View style={[styles.performanceBarFill, { width: `${averageScore}%` }]} />
          </View>
        </View>
      </View>

      {/* Recent Test Scores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Test Scores</Text>
        <View style={styles.scoresList}>
          {testScores.map((test, index) => {
            const percentage = Math.round((test.score / test.maxScore) * 100);
            const gradeColor = 
              percentage >= 90 ? AppColors.status.success.main :
              percentage >= 75 ? AppColors.status.info.main :
              percentage >= 60 ? AppColors.status.warning.main :
              AppColors.status.error.main;

            return (
              <View key={index} style={styles.scoreCard}>
                <View style={styles.scoreHeader}>
                  <View style={styles.scoreHeaderLeft}>
                    <Text style={styles.scoreSubject}>{test.subject}</Text>
                    <Text style={styles.scoreTest}>{test.test}</Text>
                  </View>
                  <View style={[styles.scorePercentage, { backgroundColor: gradeColor + '20' }]}>
                    <Text style={[styles.scorePercentageText, { color: gradeColor }]}>
                      {percentage}%
                    </Text>
                  </View>
                </View>
                <View style={styles.scoreDetails}>
                  <Text style={styles.scoreValue}>
                    {test.score} / {test.maxScore}
                  </Text>
                  <Text style={styles.scoreDate}>
                    {new Date(test.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );

  // Communication Tab Content
  const CommunicationTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Parent Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parent Information</Text>
        
        <View style={styles.parentCard}>
          <View style={styles.parentAvatar}>
            <IconSymbol name="person.fill" size={32} color={AppColors.primary.contrast} />
          </View>
          <View style={styles.parentInfo}>
            <Text style={styles.parentName}>{student.parentName}</Text>
            <View style={styles.parentDetail}>
              <IconSymbol name="phone.fill" size={14} color={AppColors.text.secondary} />
              <Text style={styles.parentDetailText}>{student.parentPhone}</Text>
            </View>
            <View style={styles.parentDetail}>
              <IconSymbol name="envelope.fill" size={14} color={AppColors.text.secondary} />
              <Text style={styles.parentDetailText}>{student.parentEmail}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Communication Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Parent</Text>
        
        <TouchableOpacity
          style={styles.communicationButton}
          onPress={handleMessageParent}
          activeOpacity={0.7}
        >
          <View style={[styles.communicationIconContainer, { backgroundColor: AppColors.primary.main }]}>
            <IconSymbol name="message.fill" size={24} color={AppColors.primary.contrast} />
          </View>
          <View style={styles.communicationButtonText}>
            <Text style={styles.communicationButtonTitle}>Message Parent</Text>
            <Text style={styles.communicationButtonSubtitle}>Send a message via app</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={AppColors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.communicationButton}
          onPress={handleCallParent}
          activeOpacity={0.7}
        >
          <View style={[styles.communicationIconContainer, { backgroundColor: AppColors.status.success.main }]}>
            <IconSymbol name="phone.fill" size={24} color={AppColors.primary.contrast} />
          </View>
          <View style={styles.communicationButtonText}>
            <Text style={styles.communicationButtonTitle}>Call Parent</Text>
            <Text style={styles.communicationButtonSubtitle}>Make a phone call</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={AppColors.text.tertiary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.communicationButton}
          onPress={() => Alert.alert('Email', 'Email interface will open here')}
          activeOpacity={0.7}
        >
          <View style={[styles.communicationIconContainer, { backgroundColor: AppColors.status.info.main }]}>
            <IconSymbol name="envelope.fill" size={24} color={AppColors.primary.contrast} />
          </View>
          <View style={styles.communicationButtonText}>
            <Text style={styles.communicationButtonTitle}>Send Email</Text>
            <Text style={styles.communicationButtonSubtitle}>Send via email</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={AppColors.text.tertiary} />
        </TouchableOpacity>
      </View>

      {/* Recent Communication */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Communication</Text>
        <View style={styles.emptyState}>
          <IconSymbol name="bubble.left.and.bubble.right" size={48} color={AppColors.text.tertiary} />
          <Text style={styles.emptyStateText}>No recent messages</Text>
          <Text style={styles.emptyStateSubtext}>Start a conversation with the parent</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{getInitials(student.name)}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{student.name}</Text>
          <Text style={styles.profileRoll}>Roll No: {student.rollNumber}</Text>
          <View style={styles.profileClass}>
            <IconSymbol name="graduationcap.fill" size={14} color={AppColors.primary.main} />
            <Text style={styles.profileClassText}>{student.class}</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
          onPress={() => setActiveTab('overview')}
        >
          <IconSymbol 
            name="chart.pie.fill" 
            size={20} 
            color={activeTab === 'overview' ? AppColors.primary.main : AppColors.text.secondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'overview' && styles.tabTextActive
          ]}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'performance' && styles.tabActive]}
          onPress={() => setActiveTab('performance')}
        >
          <IconSymbol 
            name="chart.bar.fill" 
            size={20} 
            color={activeTab === 'performance' ? AppColors.primary.main : AppColors.text.secondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'performance' && styles.tabTextActive
          ]}>
            Performance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'communication' && styles.tabActive]}
          onPress={() => setActiveTab('communication')}
        >
          <IconSymbol 
            name="message.fill" 
            size={20} 
            color={activeTab === 'communication' ? AppColors.primary.main : AppColors.text.secondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'communication' && styles.tabTextActive
          ]}>
            Communication
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'performance' && <PerformanceTab />}
      {activeTab === 'communication' && <CommunicationTab />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },

  // Profile Header
  profileHeader: {
    backgroundColor: AppColors.primary.main,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow
    shadowColor: AppColors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.contrast,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileAvatarText: {
    fontSize: FontSizes['3xl'],
    fontWeight: 'bold',
    color: AppColors.primary.main,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: AppColors.primary.contrast,
    marginBottom: Spacing.xs,
  },
  profileRoll: {
    fontSize: FontSizes.base,
    color: AppColors.primary.contrast,
    opacity: 0.9,
    marginBottom: Spacing.xs,
  },
  profileClass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
    gap: 4,
  },
  profileClassText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.primary.contrast,
  },

  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: AppColors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.ui.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: AppColors.primary.main,
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: AppColors.text.secondary,
  },
  tabTextActive: {
    color: AppColors.primary.main,
  },

  // Tab Content
  tabContent: {
    flex: 1,
  },

  // Section
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.md,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes['3xl'],
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Detailed Stats
  detailStatsContainer: {
    backgroundColor: AppColors.ui.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  detailStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  detailStatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.full,
  },
  detailStatLabel: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  detailStatValue: {
    fontSize: FontSizes.base,
    color: AppColors.text.secondary,
    fontWeight: '600',
  },

  // Attendance List
  attendanceList: {
    gap: Spacing.sm,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  attendanceDate: {
    fontSize: FontSizes.base,
    color: AppColors.text.primary,
    fontWeight: '500',
  },
  attendanceStatus: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  attendanceStatusText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },

  // Performance
  performanceCard: {
    backgroundColor: AppColors.ui.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  performanceHeaderText: {
    flex: 1,
  },
  performanceTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: AppColors.text.primary,
  },
  performanceSubtitle: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },
  performanceScore: {
    fontSize: FontSizes['4xl'],
    fontWeight: 'bold',
    color: AppColors.primary.main,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  performanceBar: {
    height: 12,
    backgroundColor: AppColors.background.secondary,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  performanceBarFill: {
    height: '100%',
    backgroundColor: AppColors.primary.main,
    borderRadius: BorderRadius.full,
  },

  // Scores List
  scoresList: {
    gap: Spacing.sm,
  },
  scoreCard: {
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  scoreHeaderLeft: {
    flex: 1,
  },
  scoreSubject: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: 2,
  },
  scoreTest: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },
  scorePercentage: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  scorePercentageText: {
    fontSize: FontSizes.base,
    fontWeight: '700',
  },
  scoreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: AppColors.text.primary,
  },
  scoreDate: {
    fontSize: FontSizes.sm,
    color: AppColors.text.tertiary,
  },

  // Parent Card
  parentCard: {
    flexDirection: 'row',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    gap: Spacing.md,
  },
  parentAvatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: AppColors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentInfo: {
    flex: 1,
  },
  parentName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: AppColors.text.primary,
    marginBottom: Spacing.sm,
  },
  parentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  parentDetailText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },

  // Communication Button
  communicationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.ui.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: AppColors.ui.border,
    gap: Spacing.md,
  },
  communicationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communicationButtonText: {
    flex: 1,
  },
  communicationButtonTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: AppColors.text.primary,
    marginBottom: 2,
  },
  communicationButtonSubtitle: {
    fontSize: FontSizes.sm,
    color: AppColors.text.secondary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },
  emptyStateText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: AppColors.text.secondary,
    marginTop: Spacing.md,
  },
  emptyStateSubtext: {
    fontSize: FontSizes.base,
    color: AppColors.text.tertiary,
    marginTop: Spacing.xs,
  },
});
