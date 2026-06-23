import { default as React } from 'react';
import { CanProps } from '../types/permissions';
export type CanMode = "all" | "any";
export interface CanMultiProps extends Omit<CanProps, "permission"> {
    permission?: string | string[];
    mode?: CanMode;
}
/**
 * Can component aprimorado com suporte a múltiplos modos
 *
 * Modos:
 * - 'all' (padrão): usuário precisa ter TODAS as permissões
 * - 'any': usuário precisa ter QUALQUER UMA das permissões
 *
 * Exemplos:
 * <CanMulti permission={["users.read", "users.write"]} mode="all">
 *   Editar usuário
 * </CanMulti>
 *
 * <CanMulti permission={["users.admin", "users.manager"]} mode="any">
 *   Admin ou Manager
 * </CanMulti>
 */
export declare const CanMulti: React.FC<CanMultiProps>;
