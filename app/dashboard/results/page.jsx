import ResultsForm from '../../ui/ResultsForm';
import ResultsTable from '../../ui/ResultsTable';

export const metadata = {
    title: 'Results',
    description: 'View all exam results. Add or delete an exam result.',
};

export default function Page() {
    return (
        <main>
            <ResultsForm />
            <br />
            <ResultsTable />
        </main>
    )
};