/**
 * Data definition for the 6 Futuristic DreamLive Creator Broadcasting Stations
 * Arranged in a true 3D diagonal depth path:
 * ONE IN FRONT -> NEXT BEHIND IT -> OFFSET TO SIDE -> FURTHER BACK -> OPPOSITE SIDE -> DEEP IN BACKGROUND
 */

export const SIX_TOWERS = [
  {
    id: 'tower-1',
    order: 1,
    name: 'Riya Sharma',
    handle: '@riya_live',
    role: 'Vocalist & Acoustic Host',
    level: 'Lv. 64',
    viewers: '18.4K',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    topGift: '🌹 Neon Rose',
    // 3D coordinates: ONE TOWER IN FRONT (Closest to camera, prominent)
    position: { x: -2.2, y: 0, z: 5.0 },
    height: 15.0,
    baseRadius: 1.6,
    topRadius: 0.6,
    color: '#8b5cf6', // Royal violet
    accentColor: '#f59e0b', // Warm gold
    activationRange: [0.08, 0.24],
  },
  {
    id: 'tower-2',
    order: 2,
    name: 'Aarav Patel',
    handle: '@aarav_dance',
    role: 'Freestyle Dance Creator',
    level: 'Lv. 58',
    viewers: '12.9K',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    topGift: '🔥 Gift Streak Combo',
    // 3D coordinates: NEXT TOWER BEHIND IT & OFFSET LEFT
    position: { x: -8.0, y: 0, z: -1.5 },
    height: 14.2,
    baseRadius: 1.45,
    topRadius: 0.55,
    color: '#d946ef',
    accentColor: '#fde047',
    activationRange: [0.24, 0.40],
  },
  {
    id: 'tower-3',
    order: 3,
    name: 'Pooja Sharma',
    handle: '@pooja_pk',
    role: 'PK Battle Champion',
    level: 'Lv. 82',
    viewers: '34.2K',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    topGift: '🐉 Sovereign Dragon',
    // 3D coordinates: NEXT TOWER OFFSET ON OPPOSITE SIDE (Right Midground)
    position: { x: 7.2, y: 0, z: -4.5 },
    height: 13.8,
    baseRadius: 1.4,
    topRadius: 0.55,
    color: '#ec4899',
    accentColor: '#f59e0b',
    activationRange: [0.40, 0.56],
  },
  {
    id: 'tower-4',
    order: 4,
    name: 'Vikram Malhotra',
    handle: '@vikram_gaming',
    role: 'Esports & Gaming Host',
    level: 'Lv. 49',
    viewers: '9.8K',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    topGift: '🚀 Galaxy Rocket',
    // 3D coordinates: FOREGROUND RIGHT FRAMING
    position: { x: 9.5, y: 0, z: 2.2 },
    height: 15.2,
    baseRadius: 1.65,
    topRadius: 0.62,
    color: '#a855f7',
    accentColor: '#38bdf8',
    activationRange: [0.56, 0.72],
  },
  {
    id: 'tower-5',
    order: 5,
    name: 'Kavya Desai',
    handle: '@kavya_voice',
    role: 'Voice Party Host',
    level: 'Lv. 71',
    viewers: '15.1K',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    topGift: '👑 Imperial Crown',
    // 3D coordinates: NEXT TOWER FURTHER BACK (Deep Left-Center)
    position: { x: -4.2, y: 0, z: -11.0 },
    height: 12.8,
    baseRadius: 1.35,
    topRadius: 0.52,
    color: '#9333ea',
    accentColor: '#fbbf24',
    activationRange: [0.72, 0.86],
  },
  {
    id: 'tower-6',
    order: 6,
    name: 'Kabir & Sam',
    handle: '@comedy_live',
    role: 'Live Comedy & Roasts',
    level: 'Lv. 67',
    viewers: '21.6K',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    topGift: '🏰 Dream Castle',
    // 3D coordinates: DEEP IN THE BACKGROUND (Far Right/Center Depth)
    position: { x: 3.8, y: 0, z: -17.5 },
    height: 11.5,
    baseRadius: 1.25,
    topRadius: 0.48,
    color: '#c084fc',
    accentColor: '#f59e0b',
    activationRange: [0.86, 0.95],
  },
];

/**
 * Sequential lightning transfer connections between the towers
 */
export const LIGHTNING_CONNECTIONS = [
  { from: 0, to: 1, startProgress: 0.16, peakProgress: 0.32 }, // Tower 1 -> Tower 2
  { from: 1, to: 2, startProgress: 0.32, peakProgress: 0.48 }, // Tower 2 -> Tower 3
  { from: 2, to: 3, startProgress: 0.48, peakProgress: 0.64 }, // Tower 3 -> Tower 4
  { from: 3, to: 4, startProgress: 0.64, peakProgress: 0.80 }, // Tower 4 -> Tower 5
  { from: 4, to: 5, startProgress: 0.80, peakProgress: 0.94 }, // Tower 5 -> Tower 6
  { from: 0, to: 3, startProgress: 0.88, peakProgress: 0.98 }, // Front Cross link T1 -> T4
  { from: 1, to: 4, startProgress: 0.90, peakProgress: 0.98 }, // Mid Cross link T2 -> T5
  { from: 2, to: 5, startProgress: 0.92, peakProgress: 0.98 }, // Back Cross link T3 -> T6
];
