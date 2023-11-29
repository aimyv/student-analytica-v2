import ResultsForm from '../ui/results/ResultsForm';
import ResultsTable from '../ui/results/ResultsTable';

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
