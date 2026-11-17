import { aiEngineer } from "../data/roles/ai-engineer";
import { cybersecurityEngineer } from "../data/roles/cybersecurity-engineer";
import { erpnextDeveloper } from "../data/roles/erpnext-developer";
import { ethicalHacker } from "../data/roles/ethical-hacker";
import { fullStackDeveloper } from "../data/roles/full-stack-developer";
import { itConsultant } from "../data/roles/it-consultant";
import type { RolePage } from "./role-types";

export type { RolePage } from "./role-types";

/** Display order for cross-links, the sitemap and llms.txt. */
export const rolePages: RolePage[] = [
  ethicalHacker,
  cybersecurityEngineer,
  aiEngineer,
  fullStackDeveloper,
  erpnextDeveloper,
  itConsultant,
];

export function getRole(slug: string): RolePage | undefined {
  return rolePages.find((page) => page.slug === slug);
}

export function otherRoles(page: RolePage): RolePage[] {
  return rolePages.filter((other) => other.slug !== page.slug);
}
