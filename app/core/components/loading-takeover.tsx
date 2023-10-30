import Spinner from '~/core/components/spinner';

export default function LoadingTakeOver() {
  return (
    <div className="absolute backdrop-blur-sm z-50 w-screen min-h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <Spinner scale={100} size={80} />
        <p className="animate-pulse text-primary prose">
          Hang on, we're getting things ready for you...
        </p>
      </div>
    </div>
  );
}
