import BarChart from '../../ui/BarChart'

export const metadata = {
    title: 'Class',
    description: 'View exam results for each class.',
};

export default function Page() {
    return (
        <main>
            <BarChart subject='Maths' />
        </main>
    )
};
