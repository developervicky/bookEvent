import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import { Update } from "next/dist/build/swc";

type UpdateEventProps = {
  params: { id: string };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          type="Update"
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
