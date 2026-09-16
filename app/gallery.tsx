import { Link } from 'expo-router';
import { Dumbbell, HeartPulse, Moon } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { MacroStat } from '@/components/macro-stat';
import { Meter } from '@/components/meter';
import { PrimaryButton } from '@/components/primary-button';
import { Ring } from '@/components/ring';
import { ScreenHeader } from '@/components/screen-header';
import { SelectableCard } from '@/components/selectable-card';
import { StatNumber } from '@/components/stat-number';
import { APP_TABS, TabBarView } from '@/components/tab-bar';
import { Text } from '@/components/ui/text';
import { spacing, type MeterHeight, type RingPreset } from '@/theme/tokens';

const avatarSample = require('@/assets/images/icon.png');

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-lg">
      <Text variant="heading">{title}</Text>
      {children}
    </View>
  );
}

function State({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-sm">
      <Text variant="caption" color="inkSoft">
        {label}
      </Text>
      {children}
    </View>
  );
}

const GOALS = [
  { key: 'energy', title: 'Retrouver de l’énergie', description: 'Mieux dormir, moins de coups de fatigue', icon: Moon },
  { key: 'strength', title: 'Me renforcer', description: 'Trois séances courtes par semaine', icon: Dumbbell },
  { key: 'heart', title: 'Prendre soin de mon cœur', description: 'Marche active et respiration', icon: HeartPulse },
] as const;

const PREFERENCES = ['Sans gluten', 'Végétarien', 'Sans lactose'] as const;

export default function GalleryScreen() {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();

  const [replayKey, setReplayKey] = useState(0);
  const [meterValue, setMeterValue] = useState(35);
  const [goal, setGoal] = useState<string>('energy');
  const [preferences, setPreferences] = useState<string[]>(['Végétarien']);
  const [activeTab, setActiveTab] = useState<string>('today');

  const togglePreference = (item: string) =>
    setPreferences((current) => (current.includes(item) ? current.filter((p) => p !== item) : [...current, item]));

  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerClassName="gap-2xl"
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing['2xl'] }}
    >
      <ScreenHeader title="Galerie" name="Camille Moreau" onAvatarPress={() => {}} />

      <View className="gap-2xl px-xl">
        <Card variant="surface" padding="lg" radius="md">
          <Text variant="label">Réduire les animations : {reducedMotion ? 'activé' : 'désactivé'}</Text>
          <Text variant="caption" color="inkSoft">
            Activé, les jauges, anneaux et compteurs affichent directement leur valeur finale.
          </Text>
          <View className="flex-row flex-wrap gap-lg">
            <Link href="/design-system">
              <Text variant="label" color="pine">
                Design system →
              </Text>
            </Link>
            <Link href="/today">
              <Text variant="label" color="pine">
                Tester la vraie TabBar →
              </Text>
            </Link>
          </View>
        </Card>

        <Section title="ScreenHeader">
          <Card padding="xs" radius="md" className="gap-0 py-0">
            <State label="  Titre + initiales (pressable)">
              <ScreenHeader withSafeArea={false} title="Bonjour Camille" name="Camille Moreau" onAvatarPress={() => {}} />
            </State>
          </Card>
          <Card padding="xs" radius="md" className="gap-0 py-0">
            <State label="  Sans titre + photo">
              <ScreenHeader withSafeArea={false} name="Camille Moreau" avatar={avatarSample} />
            </State>
          </Card>
        </Section>

        <Section title="StatNumber">
          <View key={replayKey} className="gap-lg">
            <State label="Entier">
              <StatNumber value={8432} unit="pas" color="pine" />
            </State>
            <State label="Décimal + unité">
              <StatNumber value={72.4} decimals={1} unit="kg" unitLabel="kilogrammes" />
            </State>
          </View>
          <PrimaryButton variant="secondary" label="Rejouer l’animation" onPress={() => setReplayKey((k) => k + 1)} />
        </Section>

        <Section title="Ring">
          {([0, 0.45, 1] as const).map((progress) => (
            <State key={progress} label={`sm · md · lg — ${Math.round(progress * 100)} %`}>
              <View key={`${progress}-${replayKey}`} className="flex-row items-center gap-xl">
                {(['sm', 'md', 'lg'] as RingPreset[]).map((preset) => (
                  <Ring key={preset} preset={preset} progress={progress} accessibilityLabel="Objectif du jour" />
                ))}
              </View>
            </State>
          ))}
          <State label="md avec contenu centré, couleur sage">
            <Ring key={replayKey} preset="lg" progress={0.68} color="sage" accessibilityLabel="Objectif de pas">
              <Text variant="heading" tabular>
                68 %
              </Text>
            </Ring>
          </State>
        </Section>

        <Section title="Meter">
          {(['thin', 'regular', 'thick'] as MeterHeight[]).map((height) => (
            <State key={height} label={`${height} — défaut / doux`}>
              <Meter value={meterValue} height={height} accessibilityLabel="Progression" />
              <Meter value={meterValue} height={height} tone="soft" accessibilityLabel="Progression" />
            </State>
          ))}
          <State label="0 % · 100 %">
            <Meter value={0} accessibilityLabel="Progression" />
            <Meter value={100} accessibilityLabel="Progression" />
          </State>
          <View className="flex-row gap-sm">
            {[0, 35, 80, 100].map((value) => (
              <View key={value} className="flex-1">
                <PrimaryButton variant="secondary" label={`${value} %`} onPress={() => setMeterValue(value)} />
              </View>
            ))}
          </View>
        </Section>

        <Section title="MacroStat">
          <Card key={replayKey} className="gap-xl">
            <MacroStat label="Protéines" value={82} target={120} unit="g" unitLabel="grammes" />
            <MacroStat label="Glucides" value={164} target={220} unit="g" unitLabel="grammes" />
            <MacroStat label="Lipides" value={61} target={70} unit="g" unitLabel="grammes" tone="soft" />
          </Card>
        </Section>

        <Section title="Card">
          <State label="surface · padding lg · radius md">
            <Card padding="lg" radius="md">
              <Text variant="label">Séance du matin</Text>
              <Text variant="body" color="inkSoft">
                Mobilité douce, 12 minutes.
              </Text>
            </Card>
          </State>
          <State label="surface · padding xl · radius lg">
            <Card>
              <Text variant="label">Séance du matin</Text>
              <Text variant="body" color="inkSoft">
                Mobilité douce, 12 minutes.
              </Text>
            </Card>
          </State>
          <State label="accent">
            <Card variant="accent">
              <Text variant="label">Série en cours</Text>
              <Text variant="body">Six jours d’affilée. Continuez à ce rythme.</Text>
            </Card>
          </State>
        </Section>

        <Section title="PrimaryButton">
          <State label="primary (amber, un par écran)">
            <PrimaryButton label="Commencer mon programme" onPress={() => {}} />
          </State>
          <State label="secondary">
            <PrimaryButton variant="secondary" label="Plus tard" onPress={() => {}} />
          </State>
          <State label="disabled">
            <PrimaryButton label="Commencer mon programme" disabled />
          </State>
          <State label="loading">
            <PrimaryButton label="Commencer mon programme" loading />
          </State>
        </Section>

        <Section title="SelectableCard">
          <State label="Choix unique (radio)">
            <View role="radiogroup" className="gap-sm">
              {GOALS.map((item) => (
                <SelectableCard
                  key={item.key}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  selected={goal === item.key}
                  onSelect={() => setGoal(item.key)}
                />
              ))}
            </View>
          </State>
          <State label="Choix multiple · désactivé">
            <View className="gap-sm">
              {PREFERENCES.map((item) => (
                <SelectableCard
                  key={item}
                  mode="multiple"
                  title={item}
                  selected={preferences.includes(item)}
                  onSelect={() => togglePreference(item)}
                />
              ))}
              <SelectableCard mode="multiple" title="Sans sucre ajouté" selected={false} onSelect={() => {}} disabled />
            </View>
          </State>
        </Section>

        <Section title="TabBar">
          <State label="Interactive">
            <Card padding="xs" radius="md" className="overflow-hidden py-0">
              <TabBarView activeKey={activeTab} onTabPress={setActiveTab} withSafeArea={false} />
            </Card>
          </State>
          {APP_TABS.map((tab) => (
            <State key={tab.key} label={`Actif : ${tab.label}`}>
              <Card padding="xs" radius="md" className="overflow-hidden py-0">
                <TabBarView activeKey={tab.key} onTabPress={() => {}} withSafeArea={false} />
              </Card>
            </State>
          ))}
        </Section>
      </View>
    </ScrollView>
  );
}
