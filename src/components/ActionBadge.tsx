import type { ReceptorAction } from '../types';

const ACTION_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  agonist: { bg: '#dcfce7', text: '#166534', label: 'Agonist' },
  antagonist: { bg: '#fee2e2', text: '#991b1b', label: 'Antagonist' },
  partial_agonist: { bg: '#fef9c3', text: '#854d0e', label: 'Partial Agonist' },
  inverse_agonist: { bg: '#fce7f3', text: '#9d174d', label: 'Inverse Agonist' },
  reuptake_inhibitor: { bg: '#e0f2fe', text: '#075985', label: 'Reuptake Inhibitor' },
  allosteric_modulator: { bg: '#f3e8ff', text: '#6b21a8', label: 'PAM' },
};

const AFFINITY_SYMBOLS: Record<string, string> = {
  high: '●●●',
  medium: '●●○',
  low: '●○○',
};

interface ActionBadgeProps {
  action: ReceptorAction;
  affinity?: 'high' | 'medium' | 'low';
  small?: boolean;
}

export default function ActionBadge({ action, affinity, small }: ActionBadgeProps) {
  const style = ACTION_COLORS[action] ?? { bg: '#f3f4f6', text: '#374151', label: action };
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        padding: small ? '2px 6px' : '3px 10px',
        borderRadius: 999,
        fontSize: small ? 11 : 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {style.label}
      {affinity && (
        <span style={{ opacity: 0.7, fontSize: 10 }}>{AFFINITY_SYMBOLS[affinity]}</span>
      )}
    </span>
  );
}
