import { Card, Input, Tag } from '@repo/shared/ui';
import { useEffect, useState } from 'react';

import { Quality } from '@/entities/Value';

import cls from './QualitiesBank.module.scss';

interface QualitiesBankProps {
  qualities: Quality[];
  selectedQualities: Quality[];
  handleQualityClick: (quality: Quality) => void;
}

export const QualitiesBank = (props: QualitiesBankProps) => {
  const { qualities, selectedQualities, handleQualityClick } = props;
  const [search, setSearch] = useState<string>('');
  const [filteredQualities, setFilteredQualities] = useState<Quality[]>([]);

  useEffect(() => {
    const alphabetSort = [...qualities].sort((a, b) =>
      a.quality_name.localeCompare(b.quality_name),
    );
    setFilteredQualities(alphabetSort);
  }, [qualities]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const searchTerm = event.target.value.toLowerCase();

    const searchResult = qualities.filter((quality) => {
      const name = quality.quality_name.toLowerCase();

      const normalizedName = name.replace(/[-()]/g, ' ');
      if (normalizedName.startsWith(searchTerm)) {
        return true;
      }
      const words = normalizedName.split(' ');

      return words
        .slice(1)
        .some((word) => word.length > 1 && word.startsWith(searchTerm));
    });
    searchResult.sort((a, b) => {
      const aStartsWith = a.quality_name.toLowerCase().startsWith(searchTerm);
      const bStartsWith = b.quality_name.toLowerCase().startsWith(searchTerm);

      if (aStartsWith && !bStartsWith) {
        return -1;
      }
      if (!aStartsWith && bStartsWith) {
        return 1;
      }
      return 0;
    });
    setFilteredQualities(searchResult);
  };

  const isSelected = (quality: Quality) =>
    selectedQualities.some((item) => item.quality_id === quality.quality_id);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    quality: Quality,
  ) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(quality));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className={cls.QualitiesBank}>
      <Card variant="light" padding="8">
        <Input
          placeholder="Найти качество"
          size="s"
          addonLeft={<span className="material-symbols-outlined">search</span>}
          value={search}
          onChange={onSearch}
          onDrop={(e) => {
            e.preventDefault();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'none';
          }}
        />
      </Card>
      <Card variant="light" className={cls.values_list} padding="8">
        <ul>
          {filteredQualities.map((quality) => (
            <li key={quality.quality_id}>
              <Tag
                variant={isSelected(quality) ? 'primary' : 'secondary'}
                size="s"
                draggable={!isSelected(quality)}
                onDragStart={(event) => handleDragStart(event, quality)}
                onClick={() => {
                  if (isSelected(quality)) handleQualityClick(quality);
                }}
              >
                {quality.quality_name}
              </Tag>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
