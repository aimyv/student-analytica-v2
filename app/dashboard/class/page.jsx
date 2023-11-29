import SelectSubject from '../../ui/class/SelectSubject'

export const metadata = {
    title: 'Class',
    description: 'View exam results for each class.',
};

export default function Page() {
    return (
        <main>
            <SelectSubject />
        </main>
    )
};
