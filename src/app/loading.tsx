import {Spinner} from '@/components/ui/spinner';

export default function Loading() {
  return (
    <>
      <div className="h-screen flex items-center">
        <div className="mx-auto">
          <div className="flex flex-col items-center">
            <Spinner />
          </div>
        </div>
      </div>
    </>
  );
}
