import SelectStudent from '../../ui/students/SelectStudent'

export const metadata = {
    title: 'Students',
    description: 'View exam results for each student.',
};

export default function Page() {
    return (
        <main>
            <SelectStudent />
        </main>
    )
};
