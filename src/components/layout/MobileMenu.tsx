"use client";

import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button/Button";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu automaticamente quando a rota muda (essencial para Next.js App Router)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* TRIGGER: Visível apenas até o breakpoint lg (1024px) */}
      <Button
        appearance="secondary"
        iconOnly
        leadingIcon={<Menu size={24} strokeWidth={2} />}
        onClick={() => setIsOpen(true)}
        className="lg:hidden"
        aria-label="Abrir menu de navegação"
      />

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-60 lg:hidden"
          onClose={setIsOpen}
        >
          {/* BACKDROP: Camada escurecida com blur */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            {/* PANEL: O "Drawer" deslizante */}
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-200"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-header pb-12 shadow-2xl border-r border-fg-section-separator">

                {/* Header Interno do Menu */}
                <div className="flex px-6 h-20 items-center justify-between border-b border-fg-section-separator">
                  <span className="font-primary font-bold text-xl text-fg-body tracking-wide">
                    Navegação
                  </span>
                  <Button
                    appearance="secondary"
                    iconOnly
                    leadingIcon={<X size={24} />}
                    onClick={closeMenu}
                    aria-label="Fechar menu"
                  />
                </div>

                {/* LINKS DE NAVEGAÇÃO */}
                <nav className="mt-6 px-4 space-y-1">
                  {items?.map((item, index) => {
                    // Lógica de Estado Ativo (Current)
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeMenu} // Fecha o menu ao clicar (crucial para âncoras #)
                        aria-current={isActive ? "page" : undefined}
                        className={`
                          block px-4 py-4 rounded-xl font-secondary text-lg font-medium transition-all
                          ${isActive
                            ? "bg-fg-section-separator/20 text-blue-500"
                            : "text-fg-body hover:bg-fg-section-separator/10 hover:translate-x-1"
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer do Menu (Opcional: Redes sociais ou copyright) */}
                <div className="mt-auto px-8 py-6 border-t border-fg-section-separator opacity-50">
                  <p className="text-xs font-secondary uppercase tracking-widest">© 2026 gstvux</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
