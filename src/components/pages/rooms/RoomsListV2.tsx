import { getAllRoomsByLocale } from '@/src/api/backend/getAllRoomsByLocale';
import Container from '../../templates/Container';
import RoomsGridClient from '../../organisms/RoomsGridClient';
import { getRoomById } from '@/src/api/backend/getRoomById';

interface Props {
  locale: string;
}

export default async function RoomsListV2({ locale }: Props) {
  const res = await getAllRoomsByLocale(locale);
  const content = res.data;
  const response = await getRoomById("371aaeca-c52d-46c4-af09-3e2f24a027e6", "es")
  console.log('response', response);

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 shrink-0"></div>
          <div className="flex-1">
            <RoomsGridClient rooms={content} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
