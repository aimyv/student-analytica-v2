import CardWrapper from './ui/Card'

export const metadata = {
    title: 'Overview',
    description: 'Dashboard overview.',
};

export default function Page() {
    return (
        <main className='grid h-full'>
            <div className='place-self-center'>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <CardWrapper />
                </div>
            </div>
        </main>
    )
};
