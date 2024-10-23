import PayPalButton from "@/components/PayPalButton";

export default function Page() {
  return (
    <div className="flex flex-col space-y-5 items-center justify-center">
      <p className="text-center">
        Become a supporter of sxnics, our online radio platform, and help us
        improve by funding better equipment and acquiring music licenses from
        across the globe. Your support allows us to deliver high-quality sound
        and diverse music from international artists, enhancing your listening
        experience.
      </p>
      <PayPalButton />
    </div>
  );
}
