import funnelData from '../../public/imagenes/copy.json';

type FunnelSection = {
  id: string;
  label: string;
  placement?: string;
  elements: Array<Record<string, unknown>>;
};

type SectionElement = Record<string, unknown>;

export const funnel = funnelData;

export function getSection(sectionId: string): FunnelSection {
  const section = funnel.sections.find((item) => item.id === sectionId);

  if (!section) {
    throw new Error(`Missing section: ${sectionId}`);
  }

  return section as FunnelSection;
}

export function getElement(sectionOrId: FunnelSection | string, type: string): SectionElement {
  const section = typeof sectionOrId === 'string' ? getSection(sectionOrId) : sectionOrId;
  const element = section.elements.find((item) => item.type === type);

  if (!element) {
    throw new Error(`Missing element "${type}" in section "${section.id}"`);
  }

  return element as SectionElement;
}

export function getElements(sectionOrId: FunnelSection | string, type: string): SectionElement[] {
  const section = typeof sectionOrId === 'string' ? getSection(sectionOrId) : sectionOrId;
  return section.elements.filter((item) => item.type === type) as SectionElement[];
}

export function splitLines(copy: string): string[] {
  return copy
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

