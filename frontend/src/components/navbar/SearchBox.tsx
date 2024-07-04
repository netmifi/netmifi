// THIS COMPONENT IS FOR REUSABLE SEARCH BOX ON THE NAVBAR
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn, searchFormSchema } from '@/lib/utils';
import { Form, FormControl, FormField } from '../ui/form';
import { useForm } from 'react-hook-form';
import { FaSearch, FaTimes } from "react-icons/fa";
import {
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogTrigger,
    DialogTitle,
    Dialog,
} from "@/components/ui/dialog";
import { NavLink } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";


const SearchBox = ({ type = 'guest' }: { type?: 'guest' | 'user' }) => {
    const [search, setSearch] = useState<string>('')


    const formSchema = searchFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    return (
        <>
            {type == 'user' ?
                <Form {...form}>
                    <form className="flex items-center w-full">
                        <FormField
                            name="search"
                            control={form.control}
                            render={() => (
                                <div className="flex items-center border rounded-s-lg rounded-e-none bg-background w-full">
                                    <FormControl className="px-4">
                                        <Input
                                            className="h-full rounded-e-none border-none ring-0 py-1 focus-visible::ring-0 focus-visible:outline-none"
                                            placeholder="Search anything..."
                                            value={search} onInput={(e) => setSearch(e.currentTarget.value)}
                                        />
                                    </FormControl>
                                    <Button type="button" onClick={() => setSearch('')} className={cn("px-1 bg-transparent text-secondary-foreground hover:bg-transparent", { "opacity-0 pointer-events-none": !search })}>
                                        <FaTimes />
                                    </Button>
                                </div>
                            )}
                        />

                        <Button type="button" className="rounded-s-none">
                            <FaSearch />
                        </Button>
                    </form>
                </Form>
                :
                <Dialog>
                    <DialogTrigger asChild type="button" className="rounded-s bg-transparent hover:bg-transparent text-low-contrast">
                        <Button variant={'secondary'} className="rounded-full px-3 py-2 text-red brightness-20">
                            <FaSearch />
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-secondary flex flex-col justify-center -mt-24">
                        <DialogClose className="ml-auto text-secondary bg-red hover:text-secondary hover:bg-red hover:brightness-95"> <FaTimes /></DialogClose>
                        <div className="relative">
                            <DialogTitle>
                                <Form {...form}>
                                    <form className="flex items-center w-full">
                                        <FormField
                                            name="search"
                                            control={form.control}
                                            render={() => (
                                                <div className="flex items-center border rounded-s-lg rounded-e-none bg-background w-full">
                                                    <FormControl className="px-4">
                                                        <Input
                                                            className="h-full rounded-e border-none ring-0 py-1 focus-visible::ring-0 focus-visible:outline-none"
                                                            placeholder="Search anything..."
                                                            value={search} onInput={(e) => setSearch(e.currentTarget.value)}
                                                        />
                                                    </FormControl>
                                                    <Button type="button" onClick={() => setSearch('')} className={cn("px-1 bg-transparent text-secondary-foreground hover:bg-transparent", { "opacity-0 pointer-events-none": !search })}>
                                                        <FaTimes />
                                                    </Button>
                                                </div>
                                            )}
                                        />

                                        <Button type="button" className="rounded-e-lg rounded-s-none bg-red hover:bg-red hover:brightness-95" >
                                            <FaSearch />
                                        </Button>
                                    </form>
                                </Form>

                            </DialogTitle>

                            {/* Download scrollable area for this  */}
                            <DialogFooter className="absolute top-14 bg-background w-full">
                                {search ?
                                    <ScrollArea className=" h-[300px] w-full">
                                        <div className="flex flex-col">
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary ">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">The best content production course Lorem ipsum dolor sit amet consectetur.</NavLink>
                                            <NavLink to={`/search?keyword=search1`} className="py-3 px-4 pr-8 w-full text-lg overflow-x-hidden text-nowrap hover:bg-secondary">Affiliate marketing in 5 mins</NavLink>

                                        </div>
                                    </ScrollArea>

                                    : <p className="w-full p-4 text-lg">Type to see suggestions...</p>

                                }
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            }

        </>



    )
}

export default SearchBox