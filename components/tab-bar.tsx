import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Dumbbell, House, Salad, User, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useFocusRing } from '@/hooks/use-focus-ring';
import { colors, iconStroke, sizes } from '@/theme/tokens';

type TabItem = { key: string; label: string; icon: LucideIcon };

/** Les 4 onglets de l'app. `key` = nom de la route dans app/(tabs)/. */
export const APP_TABS: readonly TabItem[] = [
  { key: 'today', label: 'Aujourd’hui', icon: House },
  { key: 'program', label: 'Programme', icon: Dumbbell },
  { key: 'nutrition', label: 'Nutrition', icon: Salad },
  { key: 'profile', label: 'Profil', icon: User },
];

function TabButton({ item, active, onPress }: { item: TabItem; active: boolean; onPress: () => void }) {
  const { focusStyle, focusProps } = useFocusRing();
  const tint = active ? colors.pine : colors.inkSoft;

  return (
    <Pressable
      role="tab"
      accessibilityLabel={item.label}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className="flex-1 items-center justify-center gap-xs rounded-md"
      style={focusStyle}
      {...focusProps}
    >
      <Icon
        as={item.icon}
        color={tint}
        size={sizes.icon}
        strokeWidth={active ? iconStroke.active : iconStroke.regular}
      />
      <Text variant="caption" color={active ? 'pine' : 'inkSoft'}>
        {item.label}
      </Text>
    </Pressable>
  );
}

type TabBarViewProps = {
  tabs?: readonly TabItem[];
  activeKey: string;
  onTabPress: (key: string) => void;
  /** Ajoute la marge de sécurité basse (désactiver dans la galerie). */
  withSafeArea?: boolean;
};

/** Barre d'onglets pure, sans dépendance à la navigation. */
export function TabBarView({ tabs = APP_TABS, activeKey, onTabPress, withSafeArea = true }: TabBarViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      role="tablist"
      className="flex-row border-t border-line bg-surface px-sm"
      style={{ height: sizes['tab-bar'] + (withSafeArea ? insets.bottom : 0), paddingBottom: withSafeArea ? insets.bottom : 0 }}
    >
      {tabs.map((item) => (
        <TabButton key={item.key} item={item} active={item.key === activeKey} onPress={() => onTabPress(item.key)} />
      ))}
    </View>
  );
}

/** Adaptateur expo-router : `<Tabs tabBar={(props) => <TabBar {...props} />} />`. */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const activeRoute = state.routes[state.index];

  return (
    <TabBarView
      tabs={APP_TABS.filter((tab) => state.routes.some((route) => route.name === tab.key))}
      activeKey={activeRoute?.name ?? ''}
      onTabPress={(key) => {
        const route = state.routes.find((candidate) => candidate.name === key);
        if (!route) return;
        const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
        if (route.key !== activeRoute?.key && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      }}
    />
  );
}
