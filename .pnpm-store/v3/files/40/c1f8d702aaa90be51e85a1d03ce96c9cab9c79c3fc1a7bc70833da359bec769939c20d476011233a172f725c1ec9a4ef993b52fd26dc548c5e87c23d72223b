import 'hardhat/types/runtime';
import type { HardhatUpgrades, PlatformHardhatUpgrades } from '.';
declare module 'hardhat/types/runtime' {
    interface HardhatRuntimeEnvironment {
        upgrades: HardhatUpgrades;
        platform: PlatformHardhatUpgrades;
    }
}
export interface HardhatPlatformConfig {
    apiKey: string;
    apiSecret: string;
    usePlatformDeploy?: boolean;
}
declare module 'hardhat/types/config' {
    interface HardhatUserConfig {
        platform?: HardhatPlatformConfig;
    }
    interface HardhatConfig {
        platform?: HardhatPlatformConfig;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map