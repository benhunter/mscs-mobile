import React, {useEffect, useState} from "react";

export type FeatureFlags = {
  // [key: string]: boolean // index signature
  debug: boolean
  courseDetailsImages: boolean
}

const defaultFeatureFlags: FeatureFlags = {
  debug: false,
  courseDetailsImages: false,
}

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  let [features, setFeatures] = useState<FeatureFlags>(defaultFeatureFlags)

  return <FeatureFlagsContext.Provider value={features}>
    {children}
  </FeatureFlagsContext.Provider>
}

export const FeatureFlagsContext = React.createContext<FeatureFlags>(defaultFeatureFlags);
export const useFeatureFlags = () => React.useContext(FeatureFlagsContext);
