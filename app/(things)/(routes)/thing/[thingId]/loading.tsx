import {Icons} from '@/components/icons';

interface ThingIdLoadingProps {}

const ThingIdLoading = ({}: ThingIdLoadingProps) => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-2">
      <p className="text-2xl font-bold">Loading...</p>
      <Icons.spinner className="w-24 h-24 animate-spin" />
    </div>
  )
}

export default ThingIdLoading;
