import Confetti from "react-confetti";
import congratulationsImg from "/hat-confetti.png";

export default function Congratulations() {
    // const [ref, { width, height }] = useElementSize();
    return (
        <>
            <div className="col-span-full grid place-content-center">
                <figure className="relative mx-auto grid place-content-center">
                    <img
                        src={congratulationsImg}
                        alt="congratulation image"
                        className="mx-auto  object-contain"
                    />
                    <figcaption className="mx-auto max-w-lg text-center">
                        <h2 className="text-2xl font-bold text-black ">
                            Congratulations on Adding Your favourite!
                        </h2>
                        <p className="mt-6 text-base text-black">
                            Thank you for entrusting us with your property. Get
                            ready for a journey filled with new connections.
                        </p>
                    </figcaption>
                </figure>
                <Confetti
                    className="!fixed mx-auto"
                    width={1200}
                    height={800}
                />
            </div>
        </>
    );
}
