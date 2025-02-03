import React, { useState } from 'react';
import { Input } from '../../atoms/input/Input';
import { Button } from '../../atoms/butoon/Button';
import { Column } from '../../../types/columns';
import useStore from '../../../stores/store';

export const ColumnManager: React.FC = () => {
    const { columns, setColumns } = useStore();
    const [newColumnName, setNewColumnName] = useState('');
    const [newColumnSlug, setNewColumnSlug] = useState('');
    const [open, setopen] = useState(false)
    const [editingColumn, setEditingColumn] = useState<Column | null>(null);


    const handleAddColumn = () => {
        if (newColumnName.trim() && newColumnSlug.trim()) {
            const newColumns = [...columns, { slug: newColumnSlug, name: newColumnName }];
            setColumns(newColumns);
            setNewColumnName('');
            setNewColumnSlug('');
        } else {
            alert('لطفاً نام و شناسه ستون را وارد کنید!');
        }
    };

    const handleDeleteColumn = (slug: string) => {
        const updatedColumns = columns.filter((col) => col.slug !== slug);
        setColumns(updatedColumns);
    };

    const handleEditColumn = (column: { slug: string; name: string }) => {
        setEditingColumn({ slug: column.slug, name: column.name });
    };

    const handleSaveEdit = () => {
        if (editingColumn) {
            const updatedColumns = columns.map((col) =>
                col.slug === editingColumn.slug ? { ...col, name: editingColumn.name } : col
            );
            setColumns(updatedColumns);
            setEditingColumn(null);
        }
    };

    return (
        <div className="mb-4 flex flex-col gap-2">
            <div className='flex justify-between items-center gap-3'>
                <h3 className="text-lg font-semibold">مدیریت ستون‌ها</h3>
                <Button onClick={() => setopen(prev => !prev)} className="w-fit" variant='secondary'>
                    {open ? "↓" : "↑"}
                </Button>
            </div>


            <div className={`${open ? "max-h-[1000px]" : "max-h-0"} overflow-hidden transition-all duration-200`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    <Input
                        value={newColumnSlug}
                        onChange={(e) => setNewColumnSlug(e.target.value)}
                        placeholder="شناسه ستون جدید"
                        className="w-full"
                    />
                    <Input
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        placeholder="نام ستون جدید"
                        className="w-full"
                    />
                    <Button onClick={handleAddColumn} className="w-full lg:w-fit">
                        افزودن ستون
                    </Button>
                </div>

                <div className="space-y-2">
                    {columns.map((column) => (
                        <div key={column.slug} className="flex items-center justify-between p-2 border rounded">
                            {editingColumn?.slug === column.slug ? (
                                <div className="flex gap-2 flex-1">
                                    <Input
                                        value={editingColumn?.name || ''}
                                        onChange={(e) =>
                                            setEditingColumn((prev) => prev ? { ...prev, name: e.target.value } : null)
                                        }
                                        placeholder="نام جدید"
                                        className="flex-1"
                                    />
                                    <Input
                                        value={editingColumn?.slug || ''}
                                        onChange={(e) =>
                                            setEditingColumn((prev) => prev ? { ...prev, slug: e.target.value } : null)
                                        }
                                        placeholder="اسلاگ جدید"
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSaveEdit} variant='success'>
                                        ذخیره
                                    </Button>
                                    <Button onClick={() => setEditingColumn(null)} variant='secondary'>
                                        لغو
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <span>{column.name}</span>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleEditColumn(column)} variant='warning'>
                                            ویرایش
                                        </Button>
                                        <Button onClick={() => handleDeleteColumn(column.slug)} variant='error'>
                                            حذف
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
