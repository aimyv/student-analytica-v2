import {
    UserGroupIcon,
    AcademicCapIcon,
    TableCellsIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const iconMap = {
    results: TableCellsIcon,
    class: UserGroupIcon,
    students: AcademicCapIcon,
};

export default async function CardWrapper() {
    return (
        <>
        {/* NOTE: comment in this code when you get to this point in the course */}

        <Link
                key="Results"
                href="/results"
        >
            <Card title="Results" value='View, add, and delete exam results.' type="results" />
        </Link>
        <Link
                key="Class"
                href="/class"
        >
            <Card title="Class" value='View average results for each class.' type="class" />
        </Link>
        <Link
                key="Students"
                href="/students"
        >
            <Card title="Students" value="View the latest exam results for each student." type="students" />
        </Link>
        </>
    );
}

export function Card({ title, value, type }) {
    const Icon = iconMap[type];

    return (
        <div className="grid rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="place-self-center flex p-4">
            {Icon ? <Icon className="h-7 w-7 text-gray-700" /> : null}
            <h3 className="ml-2 text-xl font-medium">{title}</h3>
        </div>
        <p
            className='truncate rounded-xl px-4 py-4 text-center'
        >
            {value}
        </p>
        </div>
    );
}
